import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';
import Posts from '../models/post.model.js';
import Votes from '../models/vote.model.js';

export const getPosts = async (req, res) => {
	try {
		const posts = await Posts.find().sort({ date: -1 }).limit(20);
		res.status(200).send(posts);
	} catch (err) {
		res.status(400).send(err);
	}
};

export const addPost = async (req, res) => {
	try {
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const creatorId = decodedToken.id;
		const creator = await Users.findById(creatorId);
		const creatorName = creator.name;
		// Create a new post
		const post = new Posts({
			creatorId: creatorId,
			creatorName: creatorName,
			title: req.body.title,
			content: req.body.content,
			image: req.body?.image,
		});
		const newPost = await post.save();
		await Users.findByIdAndUpdate({ _id: creatorId }, { $inc: { posts: 1 } });
		res.status(201).send({
			post: newPost,
			msg: 'Post added successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const editPost = async (req, res) => {
	try {
		const postId = Types.ObjectId(req.params.id);
		// Update post
		const updatedPost = await Posts.findByIdAndUpdate(
			postId,
			{
				content: req.body.content,
				title: req.body.title,
				image: req.body.image,
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
};

export const deletePost = async (req, res) => {
	try {
		const postId = Types.ObjectId(req.params.id);
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const creatorId = Types.ObjectId(decodedToken.id);
		await Posts.findByIdAndRemove(postId);
		await Users.findByIdAndUpdate({ _id: creatorId }, { $inc: { posts: -1 } });
		res.status(200).send('Deleted successfully');
	} catch (err) {
		res.status(400).send(err);
	}
};

export const votePost = async (req, res) => {
	try {
		const postId = Types.ObjectId(req.params.id);
		const voteType = req.params.type;
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const userId = Types.ObjectId(decodedToken.id);
		const vote = Votes.findOne({ docId: postId, userId: userId });
		if (vote) {
			// Remove vote if already voted
			await Votes.findByIdAndRemove(vote._id);
			// Update votes
			await Posts.findByIdAndUpdate({ _id: postId }, { $inc: { votes: -1 } });
		} else {
			// Create new vote
			const newVote = new Votes({
				docId: postId,
				userId: userId,
				voteType: voteType,
			});
			await newVote.save();
			// Update votes
			await Posts.findByIdAndUpdate({ _id: postId }, { $inc: { votes: 1 } });
		}
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
