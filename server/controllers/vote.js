import { startSession, Types } from 'mongoose';
import { transactionOptions } from '../helpers/transactionOptions.js';
import { getUserId } from '../helpers/user.js';
import Comments from '../models/comment.model.js';
import Posts from '../models/post.model.js';
import Users from '../models/user.model.js';
import Votes from '../models/vote.model.js';

export const voteDoc = (isUndo, voteType) => async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		const userId = getUserId(req);
		const docId = Types.ObjectId(req.params.id);
		const post = await Posts.findById(docId);
		const comment = await Comments.findById(docId);
		let newNumVotes;
		if (!post && !comment) {
			await session.abortTransaction();
			return res.status(400).send('Cannot find the document with this ID');
		}

		const vote = await Votes.findOne({ docId: docId, userId: userId });
		if (isUndo) {
			if (vote) {
				await Votes.deleteOne({ _id: vote._id }, { session });
				newNumVotes = vote.voteType ? -1 : 1;
				res.status(200).send('Deleted vote successfully');
			} else {
				await session.abortTransaction();
				return res
					.status(400)
					.send('Cannot find the vote with this document ID and user ID');
			}
		} else {
			if (vote) {
				if (vote.voteType !== voteType) {
					// Update existed vote
					await Votes.updateOne({ _id: vote._id }, { voteType: voteType }, { session });
					newNumVotes = voteType ? 2 : -2;
					res.status(200).send('Updated vote successfully');
				} else {
					await session.abortTransaction();
					return res.status(400).send('Vote unchanged');
				}
			} else {
				// Create new vote if there is no existing vote
				const newVote = new Votes(
					{
						docId: docId,
						userId: userId,
						voteType: voteType,
					},
					{ session }
				);
				await newVote.save({ session });
				newNumVotes = voteType ? 1 : -1;
				res.status(201).send('Created vote successfully');
			}
		}
		// Update the votes of the document
		let creatorId;
		if (post) {
			creatorId = post.creatorId;
			await Posts.updateOne({ _id: post._id }, { $inc: { votes: newNumVotes } }, { session });
		} else {
			creatorId = comment.creatorId;
			await Comments.updateOne(
				{ _id: comment._id },
				{ $inc: { votes: newNumVotes } },
				{ session }
			);
		}
		// Update the votes for the document's creator
		await Users.updateOne({ _id: creatorId }, { $inc: { votes: newNumVotes } }, { session });
		await session.commitTransaction();
	} catch (err) {
		console.log(err);
		// res.status(500).send(err);
		await session.abortTransaction();
	} finally {
		await session.endSession();
	}
};

export const deleteVotes = async (req, res) => {
	const session = await startSession();
	try {
		session.startTransaction(transactionOptions);
		// Get IDs of all posts and comments
		const postIds = (await Posts.find({}, { _id: 1 }, { session })).map((x) => x._id);
		const commentIds = (await Comments.find({}, { _id: 1 }, { session })).map((x) => x._id);
		const ids = [...postIds, ...commentIds];
		// Delete the votes with the docIDs (postID or commentID) no longer exist (are not in the lists retrieved above)
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
