import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

export const getUserId = (req) => {
	// The token is already verified in middleware, only need to extract the user's id
	const token = req.header('token');
	const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	const userId = Types.ObjectId(decodedToken.id);
	return userId;
};
