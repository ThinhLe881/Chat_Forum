import FormCard from '../components/Form/FormCard';
import FormHeader from '../components/Form/FormHeader';
import LoginForm from '../components/Form/LoginForm';

const LoginPage = () => {
	return (
		<FormCard>
			<FormHeader
				heading='Log in to your account'
				paragraph="Don't have an account yet?"
				linkName='Sign up'
				linkUrl='/register'
			/>
			<LoginForm />
		</FormCard>
	);
};

export default LoginPage;
