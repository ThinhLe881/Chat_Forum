import { startSession } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import Posts from '../models/post.model.js';
import Comments from '../models/comment.model.js';
import Votes from '../models/vote.model.js';

export const votePost = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const postId = Types.ObjectId(req.params.id);
		const option = req.params.option;
		const voteType = req.params.type === 'true';
		const post = await Posts.findById(postId, null, { session });
		const creatorId = post.creatorId;
		let numVotes;
		switch (option) {
			case '0': // New vote
				// Create new vote
				const newVote = new Votes(
					{
						docId: postId,
						userId: userId,
						voteType: voteType,
					},
					{ session }
				);
				await newVote.save({ session });
				numVotes = voteType ? 1 : -1;
				break;
			case '1': // Undo vote
				// Delete existed vote
				await Votes.deleteOne({ docId: postId, userId: userId }, { session });
				numVotes = voteType ? -1 : 1;
				break;
			case '2': // Add a opposite sign vote
				// Update existed vote
				await Votes.updateOne(
					{ docId: postId, userId: userId },
					{ voteType: voteType },
					{ session }
				);
				numVotes = voteType ? -2 : 2;
				break;
			default:
				await session.abortTransaction();
				return res.status(400).send('Invalid argument');
		}
		// Update the votes of the post
		const updatedPost = await Posts.findByIdAndUpdate(
			postId,
			{ $inc: { votes: numVotes } },
			{ session: session, new: true }
		);
		// Update the votes for the post's creator
		await Users.updateOne({ _id: creatorId }, { $inc: { votes: numVotes } }, { session });
		res.status(200).send({
			post: updatedPost,
			msg: 'Updated votes successfully',
		});
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const voteComment = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const commentId = Types.ObjectId(req.params.id);
		const voteType = req.params.type === 'true';
		const option = req.params.option;
		const post = await Comments.findById(commentId, null, { session });
		const creatorId = post.creatorId;
		let numVotes;
		switch (option) {
			case '0': // New vote
				// Create new vote
				const newVote = new Votes(
					{
						docId: commentId,
						userId: userId,
						voteType: voteType,
					},
					{ session }
				);
				await newVote.save({ session });
				numVotes = voteType ? 1 : -1;
				break;
			case '1': // Undo vote
				// Delete existed vote
				await Votes.deleteOne({ docId: commentId, userId: userId }, { session });
				numVotes = voteType ? -1 : 1;
				break;
			case '2': // Add a opposite sign vote
				// Update existed vote
				await Votes.updateOne(
					{ docId: commentId, userId: userId },
					{ voteType: voteType },
					{ session }
				);
				numVotes = voteType ? -2 : 2;
				break;
			default:
				break;
		}
		// Update the votes of the comment
		const updatedComment = await Comments.findByIdAndUpdate(
			commentId,
			{ $inc: { votes: numVotes } },
			{ session: session, new: true }
		);
		// Update the votes for the comment's creator
		await Users.updateOne({ _id: creatorId }, { $inc: { votes: numVotes } }, { session });
		res.status(200).send({
			comment: updatedComment,
			msg: 'Updated votes successfully',
		});
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const deleteVotes = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const postIds = (await Posts.find({}, { _id: 1 }, { session })).map((x) => x._id);
		const commentIds = (await Comments.find({}, { _id: 1 }, { session })).map((x) => x._id);
		const ids = [...postIds, ...commentIds];
		await Votes.deleteMany({ docId: { $nin: ids } }, { session });
		res.status(200).send('Deleted votes successfully');
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};
