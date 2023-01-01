import jwt from 'jsonwebtoken';

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
