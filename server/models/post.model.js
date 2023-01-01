import { Schema, Types, model } from 'mongoose';

const postSchema = new Schema(
	{
		creatorId: {
			type: Types.ObjectId,
			required: true,
		},
		creatorName: {
			type: String,
			required: true,
		},
		topic: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		// image: { type: String, required: false },
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

export default model('posts', postSchema);
