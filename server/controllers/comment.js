import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const getComments = async (req, res) => {
	try {
		const parentId = Types.ObjectId(req.params.id);
		// Get comments
		const comments = await Comments.find({ parentId: parentId })
			.sort({
				date: -1,
			})
			.limit(20);
		res.status(200).send(comments);
	} catch (err) {
		res.status(400).send(err);
	}
};

export const addComment = async (req, res) => {
	try {
		const parentId = Types.ObjectId(req.params.id);
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const creatorId = Types.ObjectId(decodedToken.id);
		const creator = await Users.findById(creatorId).name;
		const creatorName = creator.name;
		// Create a new comment
		const comment = new Comments({
			creatorId: creatorId,
			parentId: parentId,
			creatorName: creatorName,
			content: req.body.content,
			image: req.body?.image,
		});
		// Save the comment and update the parent post
		const newComment = await comment.save();
		await Posts.findByIdAndUpdate({ _id: parentId }, { $inc: { comments: 1 } });
		await Users.findByIdAndUpdate({ _id: creatorId }, { $inc: { comments: 1 } });
		res.status(201).send({
			post: newComment,
			msg: 'Comment added successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const editComment = async (req, res) => {
	try {
		const commentId = Types.ObjectId(req.params.id);
		// Update comment
		const updatedComment = await Comments.findByIdAndUpdate(
			commentId,
			{
				content: req.body.content,
				image: req.body.image,
			},
			{ new: true }
		);
		res.status(200).send({
			post: updatedComment,
			msg: 'Updated successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};

export const deleteComment = async (req, res) => {
	try {
		const commentId = Types.ObjectId(req.params.id);
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const creatorId = Types.ObjectId(decodedToken.id);
		// Delete comment and update parent doc and user
		const deletedComment = await Comments.findByIdAndRemove(commentId);
		await Posts.findByIdAndUpdate({ _id: deletedComment.parentId }, { $inc: { comments: -1 } });
		await Users.findByIdAndUpdate({ _id: creatorId }, { $inc: { comments: -1 } });
		res.status(200).send('Deleted successfully');
	} catch (err) {
		res.status(400).send(err);
	}
};

export const voteComment = async (req, res) => {
	try {
		const commentId = Types.ObjectId(req.params.id);
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
			await Comments.findByIdAndUpdate({ _id: commentId }, { $inc: { votes: -1 } });
		} else {
			// Create new vote
			const newVote = new Votes({
				docId: commentId,
				userId: userId,
				voteType: voteType,
			});
			await newVote.save();
			// Update votes
			await Comments.findByIdAndUpdate({ _id: commentId }, { $inc: { votes: 1 } });
		}
		res.status(200).send({
			msg: 'Updated votes successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
