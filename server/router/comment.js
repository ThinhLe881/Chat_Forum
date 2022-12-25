const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Post = require('../models/post.model');

const verify = require('../auth/verifyToken');

// Get all comments of a post or a parent comment
router.get('/:id', async (req, res) => {
	const parentId = req.params.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(parentId)) {
		return res.status(404).send(`No document with id: ${parentId}`);
	}
	// Get comments
	try {
		const comments = await Post.find({ parentId: parentId }).sort({
			date: -1,
		});
		res.status(200).send(comments);
	} catch (err) {
		res.status(400).send(err);
	}
});

// Add new comment
router.post('/:id', verify, async (req, res) => {
	const parentId = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const creatorId = decodedToken.id;
	const creatorUsername = await User.findById(creatorId).username;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(parentId)) {
		return res.status(404).send(`No document with id: ${parentId}`);
	}
	// Create a new comment
	const post = new Post({
		creatorId: creatorId,
		parentId: parentId,
		creatorName: creatorUsername,
		content: req.body.content,
		image: req.body?.image,
	});
	// Save the comment and update the parent post
	try {
		const newPost = await post.save();
		await Post.findByIdAndUpdate(
			{ _id: parentId },
			{ $inc: { comments: 1 } }
		);
		await User.findByIdAndUpdate(
			{ _id: creatorId },
			{ $inc: { comments: 1 } }
		);
		res.status(201).send({
			post: newPost,
			msg: 'Comment added successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Update a comment
router.patch('/:id', verify, async (req, res) => {
	const id = req.params.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No document with id: ${id}`);
	}
	// Update post
	try {
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{
				content: req.body?.content,
				title: req.body?.title,
				image: req.body?.image,
			},
			{ new: true }
		);
		res.status(200).send({
			post: updatedPost,
			msg: 'Updated successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete post or comment
router.delete('/:id', verify, async (req, res) => {
	const id = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const creatorId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No document with id: ${id}`);
	}
	try {
		const deletedPost = await Post.findByIdAndRemove(id);
		await Post.findByIdAndUpdate(
			{ _id: deletedPost.parentId },
			{ $inc: { comments: -1 } }
		);
		await User.findByIdAndUpdate(
			{ _id: creatorId },
			{ $inc: { comments: -1 } }
		);
		res.status(200).send('Deleted successfully');
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
