import { useState } from 'react';
import { loginFields } from '../../constants/FormFields';
import Input from '../Form/Input';
import FormAction from '../Form/FormAction';
import AuthFooter from './AuthFooter';
import axios from 'axios';

let fieldsText: { [id: string]: string } = {};
let fieldsError: { [id: string]: string } = {};
loginFields.forEach((field) => (fieldsText[field.id] = ''));
loginFields.forEach((field) => (fieldsError[field.id] = ''));

export default function Login() {
	const [loginState, setLoginState] = useState(fieldsText);
	const [errorState, setErrorState] = useState(fieldsError);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

	const handleSubmit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		authenticateUser();
	};

	// Handle login API
	const authenticateUser = () => {};

	return (
		<form
			className='space-y-2'
			onSubmit={handleSubmit}
		>
			<div className='-space-y-px'>
				{loginFields.map((field) => (
					<Input
						key={field.id}
						handleChange={handleChange}
						value={loginState[field.id]}
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
			</div>

			<AuthFooter />
			<FormAction
				handler={handleSubmit}
				text='Log In'
			/>
		</form>
	);
}
