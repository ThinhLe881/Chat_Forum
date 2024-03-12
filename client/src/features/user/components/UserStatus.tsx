import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import UserDropdown from '../../../components/header/UserDropdown';
import Spinner from '../../../components/ui/Spinner';
import UserAvatar from '../../../components/ui/UserAvatar';
import { useAuth } from '../../../hooks/useAuth';
import useOutsideClick from '../../../hooks/useOutsideClick';

const UserStatus = () => {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const [online, setOnline] = useState(true);
	const componentRef = useOutsideClick(setOpen, false);

	return (
		<div
			className='relative'
			ref={componentRef}
		>
			<div
				className={`flex min-h-10 min-w-52 cursor-pointer items-center justify-between rounded-md px-1 ${
					open && 'border'
				} hover:border`}
				onClick={() => setOpen(!open)}
			>
				{user ? (
					<div className='relative flex flex-grow'>
						<UserAvatar userId={user.id} />
						{online && (
							<span className='absolute bottom-[0.1rem] left-5 flex h-3 w-3'>
								<div className='absolute h-full w-full animate-ping rounded-full border-2 bg-green-500 opacity-75'></div>
								<div className='relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
							</span>
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
			</div>
			<UserDropdown
				open={open}
				online={online}
				setOnline={setOnline}
			/>
		</div>
	);
};

export default UserStatus;
