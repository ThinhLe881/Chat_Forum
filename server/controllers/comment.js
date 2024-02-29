import { Types, startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Comments from '../models/comment.model.js';
import Posts from '../models/post.model.js';
import Users from '../models/user.model.js';

export const getCommentById = async (req, res) => {
	try {
		const parentId = Types.ObjectId(req.params.id);
		const parentComment = await Comments.findById(parentId);
		const childComments = await Comments.find({ parentId: parentId }).sort({
			date: 1,
		});
		res.status(200).send({
			parent: parentComment,
			child: childComments,
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const addComment = (isChild) => async (req, res, next) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		const creatorName = (await Users.findById(creatorId, null, { session })).name;
		const parentId = Types.ObjectId(req.params.id);
		let postId = parentId;
		// Update the parent comment
		if (isChild) {
			const parentComment = await Comments.findByIdAndUpdate(
				parentId,
				{ $inc: { comments: 1 } },
				{ session }
			);
			postId = parentComment.postId;
		}
		// Create a new comment
		const newComment = new Comments(
			{
				postId: postId,
				parentId: parentId,
				creatorId: creatorId,
				creatorName: creatorName,
				content: req.body.content,
			},
			{ session }
		);
		// Insert the comment and update the parent post and user
		await newComment.save({ session });

		res.status(201).send(newComment);
		// res.status(201).send('Comment added successfully');

		// Update post comments
		await Posts.updateOne({ _id: postId }, { $inc: { comments: 1 } }, { session });
		// Update user stats
		await Users.updateOne({ _id: creatorId }, { $inc: { comments: 1 } }, { session });
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
			},
			{ new: true }
		);
		res.status(200).send(updatedComment);
		// res.status(200).send('Post updated successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const commentId = Types.ObjectId(req.params.id);
		const creatorId = getUserId(req);
		// Delete the comment
		const deletedComment = await Comments.findOneAndDelete(
			{
				_id: commentId,
				creatorId: creatorId,
			},
			{ session }
		);

		res.status(200).send(deletedComment);
		// res.status(200).send('Child comment deleted successfully');

		// Update parent comment if there is
		await Comments.updateOne(
			{ _id: deletedComment.parentId },
			{ $inc: { comments: -(deletedComment.comments + 1) } },
			{ session }
		);
		// Delete child comments of deleted comment
		await Comments.deleteMany({ parentId: commentId }, { session });
		// Update post comments
		await Posts.updateOne(
			{ _id: deletedComment.postId },
			{ $inc: { comments: -(deletedComment.comments + 1) } },
			{ session }
		);
		// Update user stats
		await Users.updateOne(
			{ _id: creatorId },
			{ $inc: { comments: -1, votes: -deletedComment.votes } },
			{ session }
		);
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
