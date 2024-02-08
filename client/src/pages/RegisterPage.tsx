import Header from '../components/Auth/AuthHeader';
import Register from '../components/Auth/Register';

const RegisterPage = () => {
	return (
		<>
			<Header
				heading='Sign up to create an account'
				paragraph='Already have an account? '
				linkName='Log in'
				linkUrl='/login'
			/>
			<Register />
		</>
	);
};

export default RegisterPage;
