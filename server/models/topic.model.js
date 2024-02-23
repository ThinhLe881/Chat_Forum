import { Schema, model } from 'mongoose';

const topicSchema = new Schema(
	{
		topicName: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'topics',
	}
);

export default model('topics', topicSchema);
