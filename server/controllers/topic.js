import { startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Posts from '../models/post.model.js';
import Topics from '../models/topic.model.js';
import UserTopics from '../models/userTopic.model.js';

export const createTopics = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		// Check whether the topic already exists
		if (await Topics.findOne({ topicName: req.body.topic })) {
			await session.abortTransaction();
			return res
				.status(400)
				.send('Topic name already exists. Please try using a different name');
		}
		// Create a new topic
		const newTopic = new Topics(
			{
				topicName: req.body.topic,
			},
			{ session }
		);
		await newTopic.save({ session });
		// Create a new user-topic relationship
		const newUserTopic = new UserTopics(
			{
				topicName: req.body.topic,
				userId: creatorId,
			},
			{ session }
		);
		await newUserTopic.save({ session });
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const getTopics = async (req, res) => {
	try {
		const topics = await Posts.aggregate([
			{
				$group: {
					_id: '$topic',
					total: { $sum: 1 },
				},
			},
		]);
		res.status(200).send(topics);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const getPostsByTopic = async (req, res) => {
	try {
		const topic = req.params.name;
		const posts = await Posts.find({ topic: topic }).sort({ date: -1 });
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
