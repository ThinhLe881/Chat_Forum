import Header from '../components/Form/FormHeader';
import Register from '../components/Form/RegisterForm';
import FormCard from '../components/Form/FormCard';

const RegisterPage = () => {
	return (
		<FormCard>
			<Header
				heading='Sign up to create an account'
				paragraph='Already have an account? '
				linkName='Log in'
				linkUrl='/login'
			/>
			<Register />
		</FormCard>
	);
};

export default RegisterPage;
