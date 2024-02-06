import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../helpers/auth.js';
import Users from '../models/user.model.js';

function error_message_format(mes) {
	let newMes = mes.replaceAll('"', '');
	return newMes.charAt(0).toUpperCase() + newMes.slice(1);
}

export const register = async (req, res) => {
	try {
		// User data validation
		const { error } = registerValidation(req.body);
		if (error) {
			return res.status(400).send(error_message_format(error.details[0].message));
		}
		if (await Users.findOne({ email: req.body.email })) {
			return res
				.status(400)
				.send('Email already exists. Please try logging in with that email');
		}
		if (await Users.findOne({ name: req.body.name })) {
			return res.status(400).send('Username already taken. Please try another username');
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		// Create a new user
		const newUser = new Users({
			name: req.body.name,
			email: req.body.email,
			password: hashPassword,
		});
		await newUser.save();
		res.status(201).send('Registered successfully');
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const login = async (req, res) => {
	try {
		// User data validation
		const { error } = loginValidation(req.body);
		if (error) {
			return res.status(400).send(error_message_format(error.details[0].message));
		}
		const user = await Users.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).send('Email was not found. Please try signing up new account.');
		}
		// Check password
		if (!(await bcrypt.compare(req.body.password, user.password))) {
			return res.status(400).send('Incorrect email or password. Please try again.');
		}
		// Create JWT token
		const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '365d' }); // set long expirey time for easy testing

		res.header('auth-token', token).status(200).send({
			token: token,
			id: user._id,
			name: user.name,
			email: user.email,
			msg: 'Logged in successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
