import { useState } from 'react';
import React from 'react';
import { registerFields } from '../../constants/FormFields';
import FormAction from '../Form/FormAction';
import Input from '../Form/Input';

let fieldsState: { [id: string]: string } = {};
registerFields.forEach((field) => (fieldsState[field.id] = ''));
const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

const Register = () => {
	const [registerState, setRegisterState] = useState(fieldsState);
	const [strongPassword, setStrongPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterState({ ...registerState, [e.target.id]: e.target.value });
	};

	const handleSubmit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (verifyPassword()) {
			registerUser();
		}
	};

	const verifyPassword = () => {
		if (!regex.test(registerState['password'])) {
			alert(
				'Password has to use at least: 1 number, 1 capital letter, 1 lowercase letter, 1 special character, and 8 characters long'
			);
			return false;
		}

		if (registerState['password'] !== registerState['confirm-password']) {
			alert("Passwords don't match");
			return false;
		}

		return true;
	};

	// Handle register API
	const registerUser = () => {};

	return (
		<form
			className='mt-8 space-y-6'
			onSubmit={handleSubmit}
		>
			<div className=''>
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
					/>
				))}
				<FormAction
					handler={handleSubmit}
					text='Signup'
				/>
			</div>
		</form>
	);
};

export default Register;
