import AuthHeader from '../components/Form/FormHeader';
import Login from '../components/Form/LoginForm';
import FormCard from '../components/Form/FormCard';

const LoginPage = () => {
	return (
		<FormCard>
			<AuthHeader
				heading='Log in to your account'
				paragraph="Don't have an account yet?"
				linkName='Sign up'
				linkUrl='/register'
			/>
			<Login />
		</FormCard>
	);
};

export default LoginPage;
