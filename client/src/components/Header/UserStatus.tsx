import { useNavigate } from 'react-router-dom';
import Login from '../../assets/login.png';
import Signup from '../../assets/signup.png';
import Button from '../Utils/Button';

const UserStatus = () => {
	const navigate = useNavigate();
	const handleRegister = () => {
		navigate('/register');
	};
	const handleLogin = () => {
		navigate('/login');
	};

	return <></>;
};

export default UserStatus;
