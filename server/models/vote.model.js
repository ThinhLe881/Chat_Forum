import { boolean } from '@hapi/joi';
import { Schema, Types, model } from 'mongoose';

const voteSchema = new Schema(
	{
		docId: {
			type: Types.ObjectId,
			required: true,
		},
		userId: {
			type: Types.ObjectId,
			required: true,
		},
		voteType: {
			type: boolean,
			default: null, // true = up vote, false = down vote
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'votes',
	}
);

export default model('votes', voteSchema);
