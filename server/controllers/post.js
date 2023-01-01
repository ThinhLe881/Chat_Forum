import { Types, startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Users from '../models/user.model.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const getPosts = async (req, res) => {
	try {
		const posts = await Posts.find().sort({ date: -1 });
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const addPost = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const creator = await Users.findById(creatorId);
		const creatorName = creator.name;
		// Create a new post
		const newPost = new Posts({
			creatorId: creatorId,
			creatorName: creatorName,
			topic: req.body.topic,
			title: req.body.title,
			content: req.body.content,
		});
		// Insert the post and update the user
		await newPost.save({ session });
		await Users.updateOne({ _id: creatorId }, { $inc: { posts: 1 } }, { session });
		res.status(201).send({
			post: newPost,
			msg: 'Post added successfully',
		});
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
				title: req.body.title,
			},
			{ new: true }
		);
		res.status(200).send({
			post: updatedPost,
			msg: 'Updated successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deletePost = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const postId = Types.ObjectId(req.params.id);
		const deletedPost = await Posts.findOneAndDelete(
			{ _id: postId, creatorId: creatorId },
			{ session }
		);
		await Comments.deleteMany({ postId: postId }, { session });
		await Users.updateOne(
			{ _id: creatorId },
			{ $inc: { posts: -1, votes: -deletedPost.votes } },
			{ session }
		);
		res.status(200).send({
			post: deletedPost,
			msg: 'Deleted successfully',
		});
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const votePost = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const postId = Types.ObjectId(req.params.id);
		const voteType = req.params.type;
		const vote = Votes.findOne({ docId: postId, userId: userId });
		let updatedPost;
		if (vote) {
			// Remove vote if already voted
			await Votes.deleteOne({ _id: vote._id }, { session });
			// Update votes
			updatedPost = await Posts.findByIdAndUpdate(
				postId,
				{ $inc: { votes: -1 } },
				{ session }
			);
		} else {
			// Create new vote
			const newVote = new Votes({
				docId: postId,
				userId: userId,
				voteType: voteType,
			});
			await newVote.save({ session });
			// Update votes
			updatedPost = await Posts.findByIdAndUpdate(
				postId,
				{ $inc: { votes: 1 } },
				{ session }
			);
		}
		res.status(200).send({
			post: updatedPost,
			msg: 'Updated votes successfully',
		});
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
