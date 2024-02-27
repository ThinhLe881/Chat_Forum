import { Types } from 'mongoose';
import Comments from '../models/comment.model.js';

export const cleanUpDeletedPost = async (req, res, next) => {
	try {
		const postId = Types.ObjectId(req.params.id);
		await Comments.deleteMany({ postId: postId });
	} catch (err) {
		console.log(err);
	}
};
