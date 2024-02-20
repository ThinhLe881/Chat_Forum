import {
	ArrowRightStartOnRectangleIcon,
	EyeIcon,
	PlusCircleIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useState } from 'react';
import { logoutUser } from '../../features/user';
import { useAuth } from '../../hooks/useAuth';
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

	return (
		<>
			{open && (
				<div className='absolute right-4 top-10 mt-2.5 flex min-w-60 flex-col divide-y rounded-sm bg-white'>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								leftIcon={<UserCircleIcon className='dropdown-icon' />}
								childrenStyle='dropdown-item text-slate-500'
							>
								My Stuff
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={(e) => {
									e.stopPropagation();
									setOnline(!online);
								}}
								rightIcon={
									<ToggleButton
										id='online'
										isChecked={online}
									/>
								}
								childrenStyle='dropdown-item'
							>
								Online Status
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={() => {}}
								childrenStyle='dropdown-item'
							>
								Profile
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={() => {}}
								childrenStyle='dropdown-item'
							>
								Style Avatar
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={() => {}}
								childrenStyle='dropdown-item'
							>
								User Settings
							</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								leftIcon={<EyeIcon className='dropdown-icon' />}
								childrenStyle='dropdown-item text-slate-500'
							>
								View Options
							</DropdownItem>
						</div>
						<div>
							<DropdownItem
								onClick={(e) => {
									e.stopPropagation();
									setDarkMode(!darkMode);
								}}
								rightIcon={
									<ToggleButton
										id='darkmode'
										isChecked={darkMode}
									/>
								}
								childrenStyle='dropdown-item'
							>
								Dark Mode
							</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								onClick={() => {}}
								leftIcon={<PlusCircleIcon className='dropdown-icon' />}
								childrenStyle='dropdown-item'
							>
								Create a Community
							</DropdownItem>
						</div>
					</div>
					<div className='py-2.5'>
						<div>
							<DropdownItem
								onClick={() => logoutUser(setAuth)}
								leftIcon={
									<ArrowRightStartOnRectangleIcon className='dropdown-icon' />
								}
								childrenStyle='dropdown-item'
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
