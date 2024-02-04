import Header from '../components/Auth/AuthHeader';
import Register from '../components/Auth/Register';

export default function RegisterPage() {
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
}
