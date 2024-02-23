import { Schema, Types, model } from 'mongoose';

const userTopicSchema = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			required: true,
		},
		topicName: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'userTopics',
	}
);

export default model('userTopics', userTopicSchema);
