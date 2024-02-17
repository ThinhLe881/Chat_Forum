import { useNavigate } from 'react-router-dom';
import { Feed } from '../features/feed';
import { RegisterForm } from '../features/user';
import FormCard from '../features/user/components/form/FormCard';
import FormHeader from '../features/user/components/form/FormHeader';
import useOutsideClick from '../hooks/useOutsideClick';

const RegisterPage = () => {
	const navigate = useNavigate();
	const componentRef = useOutsideClick(navigate, '/');

	return (
		<>
			<Feed />
			<div ref={componentRef}>
				<FormCard>
					<FormHeader
						heading='Sign up to create an account'
						paragraph='Already have an account? '
						linkName='Log in'
						linkUrl='/login'
					/>
					<RegisterForm />
				</FormCard>
			</div>
		</>
	);
};

export default RegisterPage;
