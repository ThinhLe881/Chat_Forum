import { Types, startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Users from '../models/user.model.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const getComments = async (req, res) => {
	try {
		const parentId = Types.ObjectId(req.params.id);
		// Get comments
		const comments = await Comments.find({ parentId: parentId }).sort({
			date: -1,
		});
		res.status(200).send(comments);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const addComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const creator = await Users.findById(creatorId);
		const creatorName = creator.name;
		const parentId = Types.ObjectId(req.params.id);
		// Create a new comment
		const newComment = new Comments({
			postId: parentId,
			parentId: parentId,
			creatorId: creatorId,
			creatorName: creatorName,
			content: req.body.content,
		});
		// Insert the comment and update the parent post and user
		await newComment.save({ session });
		await Posts.updateOne({ _id: parentId }, { $inc: { comments: 1 } }, { session });
		await Users.updateOne({ _id: creatorId }, { $inc: { comments: 1 } }, { session });
		res.status(201).send({
			comment: newComment,
			msg: 'Comment added successfully',
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

export const addChildComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const creator = await Users.findById(creatorId);
		const creatorName = creator.name;
		const parentId = Types.ObjectId(req.params.id);
		// Update the parent comment
		const parentComment = await Comments.findByIdAndUpdate(
			parentId,
			{ $inc: { comments: 1 } },
			{ session }
		);
		// Create a new comment
		const newComment = new Comments({
			postId: parentComment.postId,
			parentId: parentId,
			creatorId: creatorId,
			creatorName: creatorName,
			content: req.body.content,
		});
		// Save the comment and update the user
		await newComment.save({ session });
		await Users.updateOne({ _id: creatorId }, { $inc: { comments: 1 } }, { session });
		res.status(201).send({
			comment: newComment,
			msg: 'Comment added successfully',
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

export const editComment = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		const commentId = Types.ObjectId(req.params.id);
		// Update comment
		const updatedComment = await Comments.findOneAndUpdate(
			{ _id: commentId, creatorId: creatorId },
			{
				content: req.body.content,
			}
		);
		res.status(200).send({
			comment: updatedComment,
			msg: 'Updated successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const commentId = Types.ObjectId(req.params.id);
		// Delete comment and update parent doc and user
		const deletedComment = await Comments.findOneAndDelete(
			{
				_id: commentId,
				creatorId: creatorId,
			},
			{ session }
		);
		await Posts.updateOne(
			{ _id: deletedComment.parentId },
			{ $inc: { comments: -1 } },
			{ session }
		);
		await Users.updateOne(
			{ _id: creatorId },
			{ $inc: { comments: -1, votes: -deleteComment.votes } },
			{ session }
		);
		res.status(200).send({
			comment: deletedComment,
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

export const deleteChildComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const commentId = Types.ObjectId(req.params.id);
		const creatorId = getUserId(req);
		// Delete comment and update parent doc and user
		const deletedComment = await Comments.findOneAndDelete(
			{
				_id: commentId,
				creatorId: creatorId,
			},
			{ session }
		);
		await Comments.updateOne(
			{ _id: deletedComment.parentId },
			{ $inc: { comments: -1 } },
			{ session }
		);
		await Users.updateOne(
			{ _id: creatorId },
			{ $inc: { comments: -1, votes: -deleteComment.votes } },
			{ session }
		);
		res.status(200).send({
			comment: deletedComment,
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

export const voteComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const commentId = Types.ObjectId(req.params.id);
		const voteType = req.params.type;
		const vote = Votes.findOne({ docId: postId, userId: userId });
		let updatedComment;
		if (vote) {
			// Remove vote if already voted
			await Votes.deleteOne({ _id: vote._id }, { session });
			// Update votes
			updatedComment = await Comments.findByIdAndUpdate(
				commentId,
				{ $inc: { votes: -1 } },
				{ session }
			);
		} else {
			// Create new vote
			const newVote = new Votes({
				docId: commentId,
				userId: userId,
				voteType: voteType,
			});
			await newVote.save({ session });
			// Update votes
			updatedComment = await Comments.findByIdAndUpdate(
				commentId,
				{ $inc: { votes: 1 } },
				{ session }
			);
		}
		res.status(200).send({
			comment: updatedComment,
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
