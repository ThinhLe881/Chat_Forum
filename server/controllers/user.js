import { Types } from 'mongoose';
import { getUserId } from '../helpers/user.js';
import Posts from '../models/post.model.js';
import Users from '../models/user.model.js';
import Votes from '../models/vote.model.js';

export const getUser = async (req, res) => {
	try {
		const userId = Types.ObjectId(req.params.id);
		const user = await Users.findById(userId, { password: 0 });
		return res.status(200).send(user);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
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

export const getVotedPosts = (voteType) => async (req, res) => {
	try {
		const userId = getUserId(req);
		// Get all voted posts by this user
		const postIds = (await Votes.find({ userId: userId, voteType: voteType }, null)).map(
			(x) => x.docId
		);
		const posts = await Posts.find({ _id: { $in: postIds } }, null).sort({
			date: -1,
		});
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const editUserName = async (req, res) => {
	try {
		const userId = getUserId(req);
		if (!req.body.name) return res.status(400).send('Missing argument');
		const updatedUser = await Users.findByIdAndUpdate(
			userId,
			{
				name: req.body.name,
			},
			{ new: true }
		);
		res.status(200).send(updatedUser);
		// res.status(200).send('Updated successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const editUserEmail = async (req, res) => {
	try {
		const userId = getUserId(req);
		if (!req.body.email) return res.status(400).send('Missing argument');
		const updatedUser = await Users.findByIdAndUpdate(
			userId,
			{
				email: req.body.email,
			},
			{ new: true }
		);
		res.status(200).send(updatedUser);
		// res.status(200).send('Updated successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
