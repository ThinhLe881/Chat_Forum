import rateLimit from 'express-rate-limit';

export const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 30, // Limit each IP to 30 register requests per `window` per hour
	message: 'Too many signup attempts. Please try again after an hour',
	handler: (req, res, next, options) => {
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const loginLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5, // Limit each IP to 5 login requests per `window` per minute
	message: 'Too many failed login attempts. Please try again in a few minutes',
	handler: (req, res, next, options) => {
		res.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const apiLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 30, // Limit each IP to 30 requests per `window` per minute
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
