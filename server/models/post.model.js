const mongoose = require('mongoose');

const Post = new mongoose.Schema(
	{
		creatorId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		parentId: {
			type: mongoose.Types.ObjectId,
			default: null,
		},
		creatorName: {
			type: String,
			require: true,
		},
		title: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
		image: { type: String, required: false },
		votes: {
			type: Number,
			default: 0,
		},
		comments: {
			type: Number,
			default: 0,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'posts',
	}
);

module.exports = mongoose.model('posts', Post);
