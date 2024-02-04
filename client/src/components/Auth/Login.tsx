import { useState } from 'react';
import { loginFields } from '../../constants/FormFields';
import Input from '../Form/Input';
import FormAction from '../Form/FormAction';
import AuthFooter from './AuthFooter';

let fieldsState: { [id: string]: string } = {};
loginFields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
	const [loginState, setLoginState] = useState(fieldsState);

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
			className='mt-8 space-y-6'
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
					/>
				))}
			</div>

			<AuthFooter />
			<FormAction
				handler={handleSubmit}
				text='Login'
			/>
		</form>
	);
}
