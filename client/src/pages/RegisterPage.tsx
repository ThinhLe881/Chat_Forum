import FormCard from '../components/Form/FormCard';
import FormHeader from '../components/Form/FormHeader';
import RegisterForm from '../components/Form/RegisterForm';

const RegisterPage = () => {
	return (
		<FormCard>
			<FormHeader
				heading='Sign up to create an account'
				paragraph='Already have an account? '
				linkName='Log in'
				linkUrl='/login'
			/>
			<RegisterForm />
		</FormCard>
	);
};

export default RegisterPage;
