import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';
import { config } from 'dotenv';

config();

export const deleteVotes = async (req, res) => {
	try {
		const adminToken = req.header('admin-token');
		if (adminToken == process.env.ADMIN) {
			return res.status(401).send('Access denied');
		}
		const postIds = Posts.find({}, { _id: 1 }).toArray();
		const commentIds = Comments.find({}, { _id: 1 }).toArray();
		const ids = [...postIds, ...commentIds];
		await Votes.deleteMany({ docId: { $nin: ids } });
		res.status(200).send('Deleted votes successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
