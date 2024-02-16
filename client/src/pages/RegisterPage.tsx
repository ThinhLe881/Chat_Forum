import { Feed } from '../features/feed';
import { RegisterForm } from '../features/user';
import FormCard from '../features/user/components/form/FormCard';
import FormHeader from '../features/user/components/form/FormHeader';

const RegisterPage = () => {
	return (
		<>
			<Feed />
			<FormCard>
				<FormHeader
					heading='Sign up to create an account'
					paragraph='Already have an account? '
					linkName='Log in'
					linkUrl='/login'
				/>
				<RegisterForm />
			</FormCard>
		</>
	);
};

export default RegisterPage;
