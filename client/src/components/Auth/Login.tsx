import axios from 'axios';
import { useState } from 'react';
import { loginFields } from '../../constants/FormFields';
import Alert from '../Form/Alert';
import FormAction from '../Form/FormAction';
import Input from '../Form/Input';
import AuthFooter from './AuthFooter';
import { useNavigate } from 'react-router-dom';
import { User } from '../../constants/Type';

let fieldsText: { [id: string]: string } = {};
let fieldsError: { [id: string]: string } = {};
loginFields.forEach((field) => (fieldsText[field.id] = ''));
loginFields.forEach((field) => (fieldsError[field.id] = ''));

const Login = () => {
	const [loginState, setLoginState] = useState(fieldsText);
	const [apiSuccess, setApiSuccess] = useState(false);
	const [apiStatus, setApiStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setApiStatus('');
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		authenticateUser();
	};

	// Handle login API
	const authenticateUser = () => {
		setLoading(true);

		axios<String, any>({
			method: 'post',
			url: '/auth/login',
			data: {
				email: loginState['email'],
				password: loginState['password'],
			},
		})
			.then((res) => {
				const user: User = {
					email: res.data.email,
					name: res.data.name,
					id: res.data.id,
				};
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('token', res.data.token);
				setApiSuccess(true);
				navigate('/', { replace: true });
			})
			.catch((err) => {
				err.response ? setApiStatus(err.response.data) : setApiStatus(err.message);
				setApiSuccess(false);
			})
			.finally(() => setLoading(false));
	};

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
					/>
				))}
			</div>

			<AuthFooter />
			<FormAction
				handler={handleSubmit}
				text='Log In'
				loading={loading}
			/>
			<Alert
				text={apiStatus}
				success={apiSuccess}
			/>
		</form>
	);
};

export default Login;
