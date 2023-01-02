import { startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const deleteVotes = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const postIds = (await Posts.find({}, { _id: 1 }, { session })).map((x) => x._id);
		const commentIds = (await Comments.find({}, { _id: 1 }, { session })).map((x) => x._id);
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
