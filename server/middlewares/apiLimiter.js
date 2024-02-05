import rateLimit from 'express-rate-limit';

export const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 20, // Limit each IP to 10 register requests per `window` per hour
	message: {
		message: 'Too many accounts created from this IP, please try again after an hour',
	},
	handler: (req, res, next, options) => {
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 20, // Limit each IP to 10 login requests per `window` per minute
	message: {
		message: 'Too many login attempts from this IP, please try again after a 60 second pause',
	},
	handler: (req, res, next, options) => {
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
