import Topics from '../models/topic.model.js';

export const checkTopicExist = async (req, res, next) => {
	if (!(await Topics.findOne({ topicName: req.params.topic }))) {
		return res.status(400).send('Cannot find a topic with this name');
	}
	next();
};
