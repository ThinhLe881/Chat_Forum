import { Schema, Types, model } from 'mongoose';

const commentSchema = new Schema(
	{
		creatorId: {
			type: Types.ObjectId,
			required: true,
		},
		parentId: {
			type: Types.ObjectId,
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
		collection: 'comments',
	}
);

export default model('comments', commentSchema);
