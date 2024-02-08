import { Link } from 'react-router-dom';
import Icon from '../../assets/icon.png';

type Props = {
	heading: string;
	paragraph: string;
	linkName: string;
	linkUrl: string;
};

const AuthHeader = ({ heading, paragraph, linkName, linkUrl = '#' }: Props) => {
	return (
		<div className='mb-10'>
			<div className='flex justify-center'>
				<img
					alt=''
					className='h-20 w-20'
					src={Icon}
				/>
			</div>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{heading}</h2>
			<p className='mt-2 text-center text-sm text-gray-600'>
				{paragraph}{' '}
				<Link
					to={linkUrl}
					className='font-medium text-orange-600 hover:text-orange-500'
				>
					{linkName}
				</Link>
			</p>
		</div>
	);
};

export default AuthHeader;
