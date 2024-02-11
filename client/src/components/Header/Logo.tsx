import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icon.png';

const Logo = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/');
	};

	return (
		<div
			onClick={handleClick}
			className='flex cursor-pointer items-center'
		>
			<img
				alt=''
				className='h-10 w-10 rounded-full bg-orange-600 p-1'
				src={Icon}
			/>
			<span className='mx-2 font-sans text-2xl font-extrabold text-orange-600'>
				chat forum
			</span>
		</div>
	);
};

export default Logo;
