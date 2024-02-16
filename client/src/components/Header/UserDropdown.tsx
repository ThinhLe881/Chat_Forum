import {
	ArrowRightStartOnRectangleIcon,
	EyeIcon,
	PlusCircleIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DropdownItem from '../ui/DropdownItem';
import ToggleButton from '../ui/ToggleButton';

type Props = {
	open: boolean;
	online: boolean;
	setOnline: Dispatch<SetStateAction<boolean>>;
};

const UserDropdown = ({ open, online, setOnline }: Props) => {
	const [darkMode, setDarkMode] = useState(false);
	const { setAuth } = useAuth();

	const handleLogout = () => {
		localStorage.removeItem('auth-token');
		localStorage.removeItem('user-id');
		setAuth(false);
	};

	return (
		<>
			{open && (
				<div className='absolute right-4 top-10 mt-2.5 flex min-w-60 flex-col divide-y rounded-sm bg-white'>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								leftIcon={<UserCircleIcon className='h-6 w-6 text-slate-500' />}
							>
								My Stuff
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={(e) => {
									setOnline(!online);
									e.stopPropagation();
								}}
								rightIcon={<ToggleButton isChecked={online} />}
							>
								Online Status
							</DropdownItem>
						</div>
						<div>
							<DropdownItem onClick={() => {}}>Profile</DropdownItem>
						</div>
						<div>
							<DropdownItem onClick={() => {}}>Style Avatar</DropdownItem>
						</div>
						<div>
							<DropdownItem onClick={() => {}}>User Settings</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem leftIcon={<EyeIcon className='h-6 w-6 text-slate-500' />}>
								View Options
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={(e) => {
									setDarkMode(!darkMode);
									e.stopPropagation();
								}}
								rightIcon={<ToggleButton isChecked={darkMode} />}
							>
								Dark Mode
							</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								onClick={() => {}}
								leftIcon={<PlusCircleIcon className='h-6 w-6 text-slate-500' />}
							>
								Create a Community
							</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								onClick={handleLogout}
								leftIcon={
									<ArrowRightStartOnRectangleIcon className='h-6 w-6 text-slate-500' />
								}
							>
								Log Out
							</DropdownItem>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserDropdown;
