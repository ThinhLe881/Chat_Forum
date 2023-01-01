import Joi from '@hapi/joi';

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
