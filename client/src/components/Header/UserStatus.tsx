import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import UserAvatar from '../Avatar/UserAvatar';
import Spinner from '../Utils/Spinner';
import UserDropdown from './UserDropDown';

const UserStatus = () => {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<any>(null);
	const [online, setOnline] = useState(true);

	const handleClickOutside = (e: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div
				className={`flex min-h-10 min-w-52 items-center justify-between rounded-md px-1 ${
					open && 'border'
				} hover:border`}
				ref={dropdownRef}
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
				<ChevronDownIcon className='h-4 w-4 text-slate-500' />
				<UserDropdown
					open={open}
					online={online}
					setOnline={setOnline}
				/>
			</div>
		</>
	);
};

export default UserStatus;
