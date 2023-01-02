import { config } from 'dotenv';
import { startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

config();

export const deleteVotes = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const adminToken = req.header('admin-token');
		if (adminToken == process.env.ADMIN) {
			return res.status(401).send('Access denied');
		}
		const postIds = Posts.find({}, { _id: 1 }, null, { session }).toArray();
		const commentIds = Comments.find({}, { _id: 1 }, null, { session }).toArray();
		const ids = [...postIds, ...commentIds];
		await Votes.deleteMany({ docId: { $nin: ids } }, { session });
		res.status(200).send('Deleted votes successfully');
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
