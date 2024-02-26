import { startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import Posts from '../models/post.model.js';
import Topics from '../models/topic.model.js';
import UserTopics from '../models/userTopic.model.js';

export const checkTopicExist = async (req, res, next) => {
	if (!(await Topics.findOne({ topicName: req.params.topic }))) {
		return res.status(400).send('Cannot find a topic with this name');
	}
	next();
};

export const cleanUpDeletedTopic = async (req, res, next) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		// Update the posts
		await Posts.updateMany({ topic: req.params.topic }, { topic: '' }, { session });
		// Delete userTopics
		await UserTopics.deleteMany({ topicName: req.params.topic }, { session });
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
