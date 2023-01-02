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
		const creatorName = (await Users.findById(creatorId, null, { session })).name;
		// Create a new post
		const newPost = new Posts(
			{
				creatorId: creatorId,
				creatorName: creatorName,
				topic: req.body.topic,
				title: req.body.title,
				content: req.body.content,
			},
			{ session }
		);
		// Insert the post and update the creator info
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
				title: req.body.title,
				content: req.body.content,
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
		// Delete the post and its comments
		const deletedPost = await Posts.findOneAndDelete(
			{ _id: postId, creatorId: creatorId },
			{ session }
		);
		await Comments.deleteMany({ postId: postId }, { session });
		// Update the creator info
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
		const option = req.params.option;
		const voteType = req.params.type === 'true';
		const post = await Posts.findById(postId, null, { session });
		const creatorId = post.creatorId;
		let numVotes;
		switch (option) {
			case '0': // New vote
				// Create new vote
				const newVote = new Votes(
					{
						docId: postId,
						userId: userId,
						voteType: voteType,
					},
					{ session }
				);
				await newVote.save({ session });
				numVotes = voteType ? 1 : -1;
				break;
			case '1': // Undo vote
				// Delete existed vote
				await Votes.deleteOne({ docId: postId, userId: userId }, { session });
				numVotes = voteType ? -1 : 1;
				break;
			case '2': // Add a opposite sign vote
				// Update existed vote
				await Votes.updateOne(
					{ docId: postId, userId: userId },
					{ voteType: voteType },
					{ session }
				);
				numVotes = voteType ? -2 : 2;
				break;
			default:
				break;
		}
		// Update the votes of the post
		const updatedPost = await Posts.findByIdAndUpdate(
			postId,
			{ $inc: { votes: numVotes } },
			{ session: session, new: true }
		);
		// Update the votes for the post's creator
		await Users.updateOne({ _id: creatorId }, { $inc: { votes: numVotes } }, { session });
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
