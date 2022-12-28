import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../middleware/auth';
import Users from '../models/user.model';

function error_message_format(mes) {
	let newMes = mes.replaceAll('"', '');
	return newMes.charAt(0).toUpperCase() + newMes.slice(1);
}

export const register = async (req, res) => {
	try {
		// User data validation
		const { error } = registerValidation(req.body);
		if (error) {
			return res
				.status(400)
				.send(error_message_format(error.details[0].message));
		}
		if (await Users.findOne({ email: req.body.email })) {
			return res.status(400).send('Email already exists');
		}
		// Hash password
		const salt = await genSalt(10);
		const hashPassword = await hash(req.body.password, salt);
		// Create a new user
		const user = new Users({
			name: req.body.name,
			email: req.body.email,
			password: hashPassword,
		});
		await user.save();
		res.status(201).send('Registered successfully');
	} catch (err) {
		res.status(400).send(err);
	}
};

export const login = async (req, res) => {
	try {
		// User data validation
		const { error } = loginValidation(req.body);
		if (error) {
			return res
				.status(400)
				.send(error_message_format(error.details[0].message));
		}
		const user = await Users.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).send('Email is not found');
		}
		// Check password
		if (!(await compare(req.body.password, user.password))) {
			return res.status(400).send('Invalid password');
		}
		// Create JWT token
		const token = sign({ id: user._id }, process.env.TOKEN_SECRET);
		res.header('auth-token', token).status(200).send({
			token: token,
			name: user.name,
			email: user.email,
			msg: 'Logged in successfully',
		});
	} catch (err) {
		res.status(400).send(err);
	}
};
