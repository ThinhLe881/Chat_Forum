import { useNavigate } from 'react-router-dom';
import { Feed } from '../features/feed';
import { LoginForm } from '../features/user';
import FormCard from '../features/user/components/form/FormCard';
import FormHeader from '../features/user/components/form/FormHeader';
import useOutsideClick from '../hooks/useOutsideClick';

const LoginPage = () => {
	const navigate = useNavigate();
	const componentRef = useOutsideClick(navigate, '/');

	return (
		<>
			<Feed />
			<div ref={componentRef}>
				<FormCard>
					<FormHeader
						heading='Log in to your account'
						paragraph="Don't have an account yet?"
						linkName='Sign up'
						linkUrl='/register'
					/>
					<LoginForm />
				</FormCard>
			</div>
		</>
	);
};

export default LoginPage;
