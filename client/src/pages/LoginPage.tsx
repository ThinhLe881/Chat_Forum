import { useNavigate } from 'react-router-dom';
import { FormCard, FormHeader, LoginForm } from '../features/auth';
import { Feed } from '../features/feed';
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
