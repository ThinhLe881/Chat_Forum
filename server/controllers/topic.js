import Posts from '../models/post.model.js';

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
