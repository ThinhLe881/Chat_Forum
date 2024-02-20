import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useOutsideClick from '../../../hooks/useOutsideClick';
import Spinner from '../../../components/ui/Spinner';
import UserAvatar from '../../../components/ui/UserAvatar';
import UserDropdown from '../../../components/header/UserDropdown';

const UserStatus = () => {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const [online, setOnline] = useState(true);
	const componentRef = useOutsideClick(setOpen, false);

	return (
		<div
			className={`flex min-h-10 min-w-52 cursor-pointer items-center justify-between rounded-md px-1 ${
				open && 'border'
			} hover:border`}
			ref={componentRef}
			onClick={() => setOpen(!open)}
		>
			{user ? (
				<div className='flex flex-grow'>
					<UserAvatar userId={user.id} />
					{online && (
						<div className='absolute bottom-[0.45rem] right-[11.75rem] h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
					)}
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
			<ChevronDownIcon className='icon text-slate-600' />
			<UserDropdown
				open={open}
				online={online}
				setOnline={setOnline}
			/>
		</div>
	);
};

export default UserStatus;
