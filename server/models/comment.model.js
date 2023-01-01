import { Schema, Types, model } from 'mongoose';

const commentSchema = new Schema(
	{
		postId: {
			type: Types.ObjectId,
			required: true,
		},
		parentId: {
			type: Types.ObjectId,
			required: true,
		},
		creatorId: {
			type: Types.ObjectId,
			required: true,
		},
		creatorName: {
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
		collection: 'comments',
	}
);

export default model('comments', commentSchema);
