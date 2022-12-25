const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Post = require('../models/post.model');

const verify = require('../auth/verifyToken');

// Add upvote to a post or comment
router.patch('/upvote/:id', verify, async (req, res) => {
	const postId = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(404).send(`No document with id: ${postId}`);
	}
	// Update votes
	try {
		await Post.findByIdAndUpdate(
			{ _id: postId },
			{ $inc: { votes: 1 } },
			{ new: true }
		);
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $push: { upVotedPosts: postId } }
		);
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Delete upvote in a post or comment
router.patch('/upvote/undo/:id', verify, async (req, res) => {
	const postId = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(404).send(`No document with id: ${postId}`);
	}
	// Update votes
	try {
		await Post.findByIdAndUpdate(
			{ _id: postId },
			{ $inc: { votes: -1 } },
			{ new: true }
		);
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $pull: { upVotedPosts: postId } }
		);
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Downvote a post or comment
router.patch('/downvote/:id', verify, async (req, res) => {
	const postId = req.params.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(404).send(`No document with id: ${postId}`);
	}
	// Update votes
	try {
		await Post.findByIdAndUpdate(
			{ _id: postId },
			{ $inc: { votes: -1 } },
			{ new: true }
		);
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $push: { downVotedPosts: postId } }
		);
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

// Undo downvote a post or comment
router.patch('/downvote/undo/:id', verify, async (req, res) => {
	const postId = req.body.id;
	// Get user's id
	const token = req.header('auth-token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = decodedToken.id;
	// Post's id validation
	if (!mongoose.Types.ObjectId.isValid(postId)) {
		return res.status(404).send(`No document with id: ${postId}`);
	}
	// Update votes
	try {
		await Post.findByIdAndUpdate(
			{ _id: postId },
			{ $inc: { votes: 1 } },
			{ new: true }
		);
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $pull: { downVotedPosts: postId } }
		);
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
