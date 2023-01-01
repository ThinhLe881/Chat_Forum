import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			min: 6,
			max: 30,
		},
		email: {
			type: String,
			required: true,
			min: 6,
			max: 320,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 30,
		},
		// how many posts the user has made
		posts: {
			type: Number,
			default: 0,
		},
		// how many comments the user has made
		comments: {
			type: Number,
			default: 0,
		},
		// how many votes the user has received
		votes: {
			type: Number,
			default: 0,
		},
	},
	{
		collection: 'users',
	}
);

export default model('users', userSchema);
