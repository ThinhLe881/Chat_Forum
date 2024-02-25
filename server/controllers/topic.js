import { startSession } from 'mongoose';
import { createUserTopic } from '../helpers/topic.js';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Posts from '../models/post.model.js';
import Topics from '../models/topic.model.js';
import UserTopics from '../models/userTopic.model.js';

export const createTopic = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const creatorId = getUserId(req);
		// Check whether the topic already exists
		if (await Topics.findOne({ topicName: req.params.topic })) {
			await session.abortTransaction();
			return res
				.status(400)
				.send('Topic name already exists. Please try using a different name');
		}
		// Create a new topic
		const newTopic = new Topics(
			{
				topicName: req.params.topic,
				creatorId: creatorId,
			},
			{ session }
		);
		await newTopic.save({ session });
		await createUserTopic(creatorId, req.params.topic, session);
		await session.commitTransaction();
		res.status(201).send(newTopic);
		// res.status(201).send('Topic created successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const deleteTopic = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		const topic = await Topics.findOne({
			topicName: req.params.topic,
			creatorId: creatorId,
		});
		// Check whether the user is the creator of the topic
		if (!topic)
			return res
				.status(400)
				.send(
					'Cannot find a topic with this name or the user is not the creator of this topic'
				);
		// Update the posts
		await Posts.updateMany({ topic: req.params.topic }, { topic: '' });
		// Delete the topic
		const deletedTopic = await Topics.findByIdAndDelete(topic.id);
		res.status(200).send(deletedTopic);
		// res.status(200).send('Delete topic successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const joinTopic = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		// Check whether the user already joined the topic
		if (await UserTopics.findOne({ topicName: req.params.topic, userId: creatorId })) {
			return res.status(400).send('The user already joined the topic');
		}
		const newUserTopic = await createUserTopic(creatorId, req.params.topic, null);
		res.status(200).send(newUserTopic);
		// res.status(200).send('Joined topic successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const leaveTopic = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		const userTopics = await UserTopics.findOne({
			topicName: req.params.topic,
			userId: creatorId,
		});
		// Check whether the user joined the topic
		if (!userTopics) {
			return res.status(400).send('The user did not join the topic');
		}
		// Delete the relationship
		const deletedUserTopic = await UserTopics.findByIdAndDelete(userTopics.id);
		res.status(200).send(deletedUserTopic);
		// res.status(200).send('Left topic successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const favoriteTopic = async (req, res) => {
	try {
		const creatorId = getUserId(req);
		// Check whether the user joined the topic
		const userTopic = await UserTopics.findOne({
			topicName: req.params.topic,
			userId: creatorId,
		});
		if (!userTopic) {
			return res.status(400).send('The user did not join the topic');
		}
		// Update the relationship
		const updatedUserTopic = await UserTopics.findByIdAndUpdate(
			userTopic.id,
			{
				favorite: req.params.fav,
			},
			{ new: true }
		);
		res.status(200).send(updatedUserTopic);
		// res.status(200).send('Edited topic successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
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
		const topic = req.params.topic;
		const posts = await Posts.find({ topic: topic }).sort({ date: -1 });
		res.status(200).send(posts);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
