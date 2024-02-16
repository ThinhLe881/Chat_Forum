import { useNavigate } from 'react-router-dom';
import Login from '../../assets/login.png';
import Signup from '../../assets/signup.png';
import Button from '../ui/Button';

const UserEntry = () => {
	const navigate = useNavigate();
	const handleRegister = () => {
		navigate('/register');
	};
	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<div className='flex items-center justify-between space-x-2'>
			<Button
				icon={Signup}
				text='Sign Up'
				bgColor='bg-slate-200'
				bgColorHover='hover:bg-slate-300'
				txtColor='text-black'
				onClick={handleRegister}
			/>
			<Button
				icon={Login}
				text='Log In'
				bgColor='bg-orange-600'
				bgColorHover='hover:bg-orange-700'
				txtColor='text-white'
				onClick={handleLogin}
			/>
		</div>
	);
};

export default UserEntry;
