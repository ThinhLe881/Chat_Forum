import { useState, useRef } from 'react';
import React from 'react';
import { registerFields } from '../../constants/FormFields';
import FormAction from '../Form/FormAction';
import Input from '../Form/Input';
import { usernameRegex, emailRegex, passwordRegex } from '../../constants/Regex';
import axios from 'axios';

let fieldsText: { [id: string]: string } = {};
let fieldsError: { [id: string]: string } = {};
registerFields.forEach((field) => (fieldsText[field.id] = ''));
registerFields.forEach((field) => (fieldsError[field.id] = ''));

const Register = () => {
	const [registerState, setRegisterState] = useState(fieldsText);
	const [errorState, setErrorState] = useState(fieldsError);
	const [apiError, setApiError] = useState(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterState({ ...registerState, [e.target.id]: e.target.value });
	};

	const handleSubmit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (verifyEmail() && verifyPassword()) {
			registerUser();
		}

		setErrorState({ ...fieldsError });
	};

	const verifyUsername = () => {
		if (!usernameRegex.test(registerState['username'])) {
			fieldsError['username'] = 'Username has to be at least 6 characters long';
			return false;
		}

		fieldsError['username'] = '';
		return true;
	};

	const verifyEmail = () => {
		if (!emailRegex.test(registerState['email'])) {
			fieldsError['email'] = 'Please use a valid email address';
			return false;
		}

		fieldsError['email'] = '';
		return true;
	};

	const verifyPassword = () => {
		if (!passwordRegex.test(registerState['password'])) {
			fieldsError['password'] =
				'Password has to use at least: 1 number, 1 capital letter, 1 lowercase letter, 1 special character, and 8 characters long';
			return false;
		}

		fieldsError['password'] = '';

		if (registerState['password'] !== registerState['confirm-password']) {
			fieldsError['confirm-password'] = 'Passwords do not match';
			return false;
		}

		fieldsError['confirm-password'] = '';
		return true;
	};

	// Handle register API
	const registerUser = () => {
		axios<String, any>({
			method: 'post',
			url: '/auth/register',
			data: {
				name: registerState['username'],
				email: registerState['email'],
				password: registerState['password'],
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				setApiError(err.response.data);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{registerFields.map((field) => (
					<Input
						key={field.id}
						handleChange={handleChange}
						value={registerState[field.id]}
						labelText={field.labelText}
						labelFor={field.labelFor}
						id={field.id}
						name={field.name}
						type={field.type}
						isRequired={field.isRequired}
						placeholder={field.placeholder}
						errorText={errorState[field.id]}
					/>
				))}
				{apiError ? <div>{apiError}</div> : <></>}
				<FormAction
					handler={handleSubmit}
					text='Sign Up'
				/>
			</div>
		</form>
	);
};

export default Register;
