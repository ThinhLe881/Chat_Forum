const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

export const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).max(30).required(),
		email: Joi.string().min(6).max(320).email().required(),
		password: Joi.string().min(6).max(30).required(),
	});
	return schema.validate(data);
};

export const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).max(320).email().required(),
		password: Joi.string().min(6).max(30).required(),
	});
	return schema.validate(data);
};

export const verifyToken = function (req, res, next) {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).send('Access denied');
	}
	try {
		req.user = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		res.status(400).send('Invalid token');
	}
};
