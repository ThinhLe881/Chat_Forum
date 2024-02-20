import {
	ArrowTrendingUpIcon,
	BellIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import { TopicButton, TopicSearchBar } from '../../features/topic';
import { UserStatus } from '../../features/user';
import Logo from '../ui/Logo';
import UserEntry from './UserEntry';

type Props = {
	authenticated: boolean;
};

const NavBar = ({ authenticated }: Props) => {
	return (
		<div className='sticky top-0 z-50 bg-white px-2 py-1 shadow-sm md:px-4'>
			<div className='flex items-center justify-between space-x-3'>
				<Logo />
				<TopicButton />
				<TopicSearchBar />
				<ArrowTrendingUpIcon className='nav-icon' />
				<ChatBubbleOvalLeftEllipsisIcon className='nav-icon' />
				<BellIcon className='nav-icon' />
				<PlusIcon className='nav-icon' />
				{authenticated ? <UserStatus /> : <UserEntry />}
			</div>
		</div>
	);
};

export default NavBar;
