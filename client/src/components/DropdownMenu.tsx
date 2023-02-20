import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import {
	ArrowTrendingUpIcon,
	PlusIcon,
	StarIcon,
	UserCircleIcon,
	Cog6ToothIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import CommunityAvatar from './CommunityAvatar';

type MenyProps = {
	option: 'pageMenu' | 'userMenu' | 'sideMenu';
	stateChanger: (state: boolean) => void;
};

type ItemProps = {
	children: React.ReactNode;
	className?: string;
};

type CommunityProps = {
	communities: Array<string>;
	stateChanger: (state: boolean) => void;
	className?: string;
};

function DropdownMenu({ option, stateChanger }: MenyProps) {
	const communities = ['gaming', 'CodingForLife', 'movies_hub', 'stockInvesting'];

	function DropdownItem({ children, className }: ItemProps) {
		return <a className={`flex h-10 items-center text-sm ${className}`}>{children}</a>;
	}

	function CommunitiesList({ communities, stateChanger, className }: CommunityProps) {
		const listItems = communities.map((community) => (
			<li
				key={community.toString()}
				onClick={() => stateChanger(false)}
			>
				<DropdownItem className='hover:bg-gray-100'>
					<div className='flex min-w-[220px] flex-1 items-center'>
						<CommunityAvatar
							name={community}
							small
						/>
						<span className='ml-2'>r/{community}</span>
						<StarIcon className='ml-auto h-5 w-5 text-gray-500' />
					</div>
				</DropdownItem>
			</li>
		));
		return <ul className={`${className}`}>{listItems}</ul>;
	}

	switch (option) {
		case 'pageMenu':
			return (
				<div className='absolute top-10 left-0 mx-3 overflow-hidden rounded-md border border-gray-400 bg-white px-4 py-1 lg:py-3 xl:min-w-[280px]'>
					<DropdownItem className='hover:bg-gray-100 lg:hidden'>
						<div
							className='flex items-center'
							onClick={() => stateChanger(false)}
						>
							<HomeIcon className='mr-2 h-5 w-5' />
							<span className='font-medium'>Home</span>
						</div>
					</DropdownItem>
					<DropdownItem className='hover:bg-gray-100 lg:hidden'>
						<div
							className='flex items-center'
							onClick={() => stateChanger(false)}
						>
							<ArrowTrendingUpIcon className='mr-2 h-5 w-5' />
							<span className='font-medium'>Popular</span>
						</div>
					</DropdownItem>
					<DropdownItem className='hidden lg:flex'>
						<form className='flex-1 cursor-pointer items-center rounded-sm border-gray-200 bg-gray-100 p-1.5 ring-1 ring-inset ring-blue-500'>
							<input
								className='bg-transparent outline-none'
								type='text'
								placeholder='Filter'
							/>
							<button
								type='submit'
								hidden
							/>
						</form>
					</DropdownItem>
					<DropdownItem className='hidden lg:flex'>
						<span className='ml-2 text-[10px] font-medium text-gray-500'>
							YOUR COMMUNITIES
						</span>
					</DropdownItem>
					<DropdownItem className='hidden hover:bg-gray-100 lg:flex'>
						<div
							className='flex items-center'
							onClick={() => stateChanger(false)}
						>
							<PlusIcon className='mx-2 h-7 w-7' />
							<span>Create Community</span>
						</div>
					</DropdownItem>
					<CommunitiesList
						stateChanger={stateChanger}
						communities={communities}
						className='hidden px-2 lg:block'
					/>
				</div>
			);

		case 'userMenu':
			return (
				<div className='absolute right-0 top-8 min-w-[150px] overflow-hidden rounded-md border border-gray-400 bg-white px-4 py-1 md:top-11 lg:min-w-[220px]'>
					<DropdownItem className='hover:bg-gray-100'>
						<div
							onClick={() => stateChanger(false)}
							className='flex items-center'
						>
							<UserCircleIcon className='mr-2 h-5 w-5' />
							<span className='font-medium'>Profile</span>
						</div>
					</DropdownItem>
					<DropdownItem className='hover:bg-gray-100'>
						<div
							onClick={() => stateChanger(false)}
							className='flex items-center'
						>
							<Cog6ToothIcon className='mr-2 h-5 w-5' />
							<span className='font-medium'>User Settings</span>
						</div>
					</DropdownItem>
					<DropdownItem className='hover:bg-gray-100'>
						<div
							onClick={() => stateChanger(false)}
							className='flex items-center'
						>
							<ArrowRightOnRectangleIcon className='mr-2 h-5 w-5' />
							<span className='font-medium'>Log Out</span>
						</div>
					</DropdownItem>
				</div>
			);

		case 'sideMenu':
			return (
				<div className='absolute top-10 left-0 w-72 rounded-md border border-gray-400 bg-white px-3 py-1'>
					<DropdownItem className='px-1'>
						<span className='font-medium'>Your Communities</span>
					</DropdownItem>
					<DropdownItem className='hover:bg-gray-100'>
						<div
							className='flex items-center'
							onClick={() => stateChanger(false)}
						>
							<PlusIcon className='mr-2 h-6 w-6 text-gray-600' />
							<span>Create a community</span>
						</div>
					</DropdownItem>
					<CommunitiesList
						stateChanger={stateChanger}
						communities={communities}
					/>
				</div>
			);

		default:
			return null;
	}
}

export default DropdownMenu;
