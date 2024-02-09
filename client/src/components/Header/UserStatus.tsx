import Login from '../../assets/login.png';
import Signup from '../../assets/signup.png';
import Button from '../Utils/Button';

const UserStatus = () => {
	return (
		<div className='flex items-center justify-between space-x-2'>
			<Button
				icon={Signup}
				text='Sign Up'
				bgColor='bg-slate-200'
				bgColorHover='bg-slate-300'
				txtColor='text-black'
			/>
			<Button
				icon={Login}
				text='Log In'
				bgColor='bg-orange-600'
				bgColorHover='bg-orange-700'
				txtColor='text-white'
			/>
		</div>
	);
};

export default UserStatus;
