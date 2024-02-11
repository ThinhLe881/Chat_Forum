import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../utils/AuthContext';
import UserAvatar from '../Avatar/UserAvatar';
import Spinner from '../Utils/Spinner';

const UserStatus = () => {
	const { user } = useAuth();

	return (
		<div className='flex min-h-10 min-w-52 items-center justify-between rounded-md px-1 hover:border'>
			{user ? (
				<div className='flex flex-grow gap-x-1 '>
					<UserAvatar userId={user.id} />
					<div className='flex flex-grow flex-col'>
						<div className='text-sm font-medium'>{user.name}</div>
						<div className='flex items-center gap-x-0.5'>
							<StarIcon className='h-3 w-3 text-orange-600' />
							<div className='text-xs text-slate-500'>{user.votes} votes</div>
						</div>
					</div>
				</div>
			) : (
				<div className='flex flex-grow items-center justify-center'>
					<Spinner />
				</div>
			)}
			<ChevronDownIcon className='h-4 w-4 text-slate-500' />
		</div>
	);
};

export default UserStatus;
