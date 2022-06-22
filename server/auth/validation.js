const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string()
                    .min(6)
                    .max(30)
                    .required(),
        email: Joi.string()
                    .min(6)
                    .max(320)
                    .email()
                    .required(),
        password: Joi.string()
                    .min(6)
                    .max(30)
                    .required()
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
                    .min(6)
                    .max(320)
                    .email()
                    .required(),
        password: Joi.string()
                    .min(6)
                    .max(30)
                    .required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
