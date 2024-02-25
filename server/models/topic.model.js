import { Schema, Types, model } from 'mongoose';

const topicSchema = new Schema(
	{
		topicName: {
			type: String,
			required: true,
		},
		creatorId: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{
		collection: 'topics',
	}
);

export default model('topics', topicSchema);
