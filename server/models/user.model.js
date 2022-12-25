const mongoose = require('mongoose');

const User = new mongoose.Schema(
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
		// how many upvotes and downvotes the user has received
		upVotes: {
			type: Number,
			default: 0,
		},
		downVotes: {
			type: Number,
			default: 0,
		},
		// the posts that the user upvoted or downvoted
		// might change it later due to document size limit
		// -> create votedPosts collections
		// 		each document stored userId and postId that been up/down voted
		upVotedPosts: [{ type: mongoose.Types.ObjectId }],
		downVotedPosts: [{ type: mongoose.Types.ObjectId }],
	},
	{
		collection: 'users',
	}
);

module.exports = mongoose.model('users', User);
