import UserTopics from '../models/userTopic.model.js';

export const createUserTopic = async (userId, topicName, session) => {
	// Create a new user-topic relationship
	const newUserTopic = new UserTopics(
		{
			topicName: topicName,
			userId: userId,
		},
		{ session }
	);
	return await newUserTopic.save({ session });
};
