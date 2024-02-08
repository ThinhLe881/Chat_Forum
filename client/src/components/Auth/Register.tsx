import axios from 'axios';
import React, { useState } from 'react';
import { registerFields } from '../../constants/FormFields';
import { emailRegex, passwordRegex, usernameRegex } from '../../constants/Regex';
import Alert from '../Form/Alert';
import FormAction from '../Form/FormAction';
import Input from '../Form/Input';

let fieldsText: { [id: string]: string } = {};
let fieldsError: { [id: string]: string } = {};
registerFields.forEach((field) => (fieldsText[field.id] = ''));
registerFields.forEach((field) => (fieldsError[field.id] = ''));

const Register = () => {
	const [registerState, setRegisterState] = useState(fieldsText);
	const [errorState, setErrorState] = useState(fieldsError);
	const [apiSuccess, setApiSuccess] = useState(false);
	const [apiStatus, setApiStatus] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setApiStatus('');
		setRegisterState({ ...registerState, [e.target.id]: e.target.value });
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (verifyUsername() && verifyEmail() && verifyPassword()) {
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
		setLoading(true);

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
				setApiStatus('Your account has been created successfully');
				setApiSuccess(true);
			})
			.catch((err) => {
				err.response ? setApiStatus(err.response.data) : setApiStatus(err.message);
				setApiSuccess(false);
			})
			.finally(() => setLoading(false));
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
				{apiSuccess ? <div>{apiSuccess}</div> : <></>}
				<FormAction
					handler={handleSubmit}
					text={'Sign Up'}
					loading={loading}
				/>
				<Alert
					text={apiStatus}
					success={apiSuccess}
				/>
			</div>
		</form>
	);
};

export default Register;
