import { ViewColumnsIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import DropdownItem from '../../../components/ui/DropdownItem';
import useOutsideClick from '../../../hooks/useOutsideClick';
import TopicDropdown from './TopicDropdown';

const TopicButton = () => {
	const [open, setOpen] = useState(false);
	const componentRef = useOutsideClick(setOpen, false);

	return (
		<div
			className='relative'
			ref={componentRef}
		>
			<div
				className={`flex min-h-10 w-72 items-center justify-between rounded-md px-1 ${
					open && 'border'
				} hover:border`}
				onClick={() => setOpen(!open)}
			>
				<div className='-m-2.5 flex-grow'>
					<DropdownItem
						leftIcon={<HomeIcon className='dropdown-icon text-black' />}
						rightIcon={
							open && (
								<div className='flex items-center'>
									<ViewColumnsIcon className='icon rotate-90' />
									<ChevronLeftIcon className='h-3 w-3' />
								</div>
							)
						}
						childrenStyle='dropdown-item'
					>
						Home
					</DropdownItem>
				</div>
				<ChevronDownIcon className='icon' />
			</div>
			<TopicDropdown open={open} />
		</div>
	);
};

export default TopicButton;
