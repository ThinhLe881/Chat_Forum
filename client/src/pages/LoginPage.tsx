import AuthHeader from '../components/Auth/AuthHeader';
import Login from '../components/Auth/Login';

const LoginPage = () => {
	return (
		<>
			<AuthHeader
				heading='Log in to your account'
				paragraph="Don't have an account yet?"
				linkName='Sign up'
				linkUrl='/register'
			/>
			<Login />
		</>
	);
};

export default LoginPage;
