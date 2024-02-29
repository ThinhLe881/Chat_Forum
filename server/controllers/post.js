import { Types, startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Comments from '../models/comment.model.js';
import Posts from '../models/post.model.js';
import Topics from '../models/topic.model.js';
import Users from '../models/user.model.js';

export const getPosts = async (req, res) => {
	try {
		const posts = await Posts.find().sort({ date: -1 });
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const getPostById = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const postId = Types.ObjectId(req.params.id);
		const post = await Posts.findById(postId);
		// Get the highest layer comments of the post
		const comments = await Comments.find({ parentId: postId }).sort({
			date: 1,
		});
		res.status(200).send({
			post: post,
			comments: comments,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const addPost = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const creatorName = (await Users.findById(creatorId, null, { session })).name;
		const topic = req.body.topic;
		// Check whether the topic exists
		if (!(await Topics.findOne({ topicName: topic }))) {
			await session.abortTransaction();
			return res.status(400).send('Cannot find a topic with this name');
		}
		// Create a new post
		const newPost = new Posts(
			{
				creatorId: creatorId,
				creatorName: creatorName,
				topic: topic,
				title: req.body.title,
				content: req.body.content,
			},
			{ session }
		);
		// Insert the post and update the creator info
		await newPost.save({ session });
		await Users.updateOne({ _id: creatorId }, { $inc: { posts: 1 } }, { session });
		res.status(201).send(newPost);
		// res.status(201).send('Post created successfully');
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const editPost = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		const postId = Types.ObjectId(req.params.id);
		// Update post
		const updatedPost = await Posts.findOneAndUpdate(
			{ _id: postId, creatorId: creatorId },
			{
				content: req.body.content,
			},
			{ new: true }
		);
		res.status(200).send(updatedPost);
		// res.status(200).send('Post updated successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deletePost = async (req, res, next) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const postId = Types.ObjectId(req.params.id);
		// Delete the post, the comments will be deleted later
		const deletedPost = await Posts.findOneAndDelete(
			{ _id: postId, creatorId: creatorId },
			{ session }
		);
		// Update the creator info
		await Users.updateOne(
			{ _id: creatorId },
			{ $inc: { posts: -1, votes: -deletedPost.votes } },
			{ session }
		);
		res.status(200).send(deletedPost);
		// res.status(200).send('Post deleted successfully');
		await session.commitTransaction();
		next();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
