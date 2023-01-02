import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const verifyToken = function (req, res, next) {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).send('Access denied');
	}
	try {
		req.user = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid token');
	}
};

export const verifyAdmin = function (req, res, next) {
	try {
		const adminToken = req.header('admin-token');
		if (!adminToken || adminToken != process.env.ADMIN) {
			return res.status(401).send('Access denied');
		} else {
			next();
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid token');
	}
};
