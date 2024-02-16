import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Feed } from '../features/feed';
import { LoginForm } from '../features/user';
import FormCard from '../features/user/components/form/FormCard';
import FormHeader from '../features/user/components/form/FormHeader';

const LoginPage = () => {
	const loginRef = useRef<any>(null);
	const navigate = useNavigate();

	const handleClickOutside = (e: MouseEvent) => {
		if (loginRef.current && !loginRef.current.contains(e.target)) {
			navigate('/');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<Feed />
			<div ref={loginRef}>
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
