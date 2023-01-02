import { Types, startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Users from '../models/user.model.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const getUser = async (req, res) => {
	try {
		const userId = Types.ObjectId(req.params.id);
		const user = await Users.findById(userId, { password: 0 });
		return res.status(200).send({ user });
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const editUser = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const updatedUser = await Users.findByIdAndUpdate(
			userId,
			{
				name: req.body.name,
				email: req.body.email,
			},
			{ session: session, new: true }
		);
		if (req.body.name) {
			await Posts.updateMany(
				{ creatorId: userId },
				{ creatorName: req.body.name },
				{ session }
			);
			await Comments.updateMany(
				{ creatorId: userId },
				{ creatorName: req.body.name },
				{ session }
			);
		}
		res.status(200).send({
			user: updatedUser,
			msg: 'Updated successfully',
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

export const getUserPosts = async (req, res) => {
	try {
		const userId = Types.ObjectId(req.params.id);
		const posts = await Posts.find({ creatorId: userId }).sort({
			date: -1,
		});
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const getVotedPosts = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const voteType = req.params.type;
		const userId = getUserId(req);
		// Get all up voted posts
		const postIds = (
			await Votes.find({ userId: userId, voteType: voteType }, null, { session })
		).map((x) => x.docId);
		const posts = await Posts.find({ _id: { $in: postIds } }, null, { session }).sort({
			date: -1,
		});
		res.status(200).send({
			posts: posts,
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
