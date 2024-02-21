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
				<div className='group relative inline-block'>
					<ArrowTrendingUpIcon className='nav-icon' />
					<span className='invisible absolute -left-3 mt-0.5 rounded-md bg-black px-2 py-1 text-xs font-medium text-white group-hover:visible'>
						Popular
					</span>
				</div>
				<div className='group relative inline-block'>
					<ChatBubbleOvalLeftEllipsisIcon className='nav-icon' />
					<span className='invisible absolute -left-1 mt-0.5 rounded-md bg-black px-2 py-1 text-xs font-medium text-white group-hover:visible'>
						Chat
					</span>
				</div>
				<div className='group relative inline-block'>
					<BellIcon className='nav-icon' />
					<span className='invisible absolute -left-[1.6rem] mt-0.5 rounded-md bg-black px-2 py-1 text-xs font-medium text-white group-hover:visible'>
						Notifications
					</span>
				</div>
				<div className='group relative inline-block'>
					<PlusIcon className='nav-icon' />
					<span className='invisible absolute -left-[1.4rem] mt-0.5 min-w-20 rounded-md bg-black px-2 py-1 text-xs font-medium text-white group-hover:visible'>
						Create Post
					</span>
				</div>
				{authenticated ? <UserStatus /> : <UserEntry />}
			</div>
		</div>
	);
};

export default NavBar;
