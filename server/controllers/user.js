import { Types } from 'mongoose';
import { verify } from 'jsonwebtoken';
import Users from '../models/user.model';
import Posts from '../models/post.model';
import Votes from '../models/vote.model';

export const getUser = async (req, res) => {
	try {
		const userId = Types.ObjectId(req.params.id);
		const user = await Users.findById(userId);
		return res.status(200).send({ user });
	} catch (err) {
		res.status(400).send(err);
	}
};

export const editUser = async (req, res) => {
	try {
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = verify(token, process.env.TOKEN_SECRET);
		const userId = Types.ObjectId(decodedToken.id);

		const updatedUser = await Users.findByIdAndUpdate(
			userId,
			{
				name: req.body.name,
				email: req.body.email,
			},
			{ new: true }
		);
		res.status(200).send({
			user: updatedUser,
			msg: 'Updated successfully',
		});
	} catch (err) {
		res.status(400).send(err);
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
		res.status(400).send(err);
	}
};

export const getVotedPosts = async (req, res) => {
	try {
		const voteType = req.params.type;
		// Get user's id
		const token = req.header('auth-token');
		const decodedToken = verify(token, process.env.TOKEN_SECRET);
		const userId = Types.ObjectId(decodedToken.id);
		// Get all up voted posts
		const postIds = await Votes.find({ userId: userId, voteType: voteType })
			.map((x) => x.postId)
			.toArray();
		const posts = await Posts.find({ _id: { $in: postIds } }).sort({
			date: -1,
		});

		return res.status(200).send({
			posts: posts,
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
