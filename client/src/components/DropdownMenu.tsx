import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { ArrowTrendingUpIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';
import CommunityAvatar from './CommunityAvatar';

type MenyProps = {
	option: boolean;
	stateChanger: (state: boolean) => void;
};

type ItemProps = {
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	childMenu?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
};

type CommunityProps = {
	communities: Array<string>;
	className?: string;
};

function DropdownMenu({ option, stateChanger }: MenyProps) {
	const communities = ['gaming', 'CodingForLife', 'movies_hub', 'stockInvesting'];

	// props.option is true if the dropdown menu is for page selection, false for user settings
	function DropdownItem({
		leftIcon,
		rightIcon,
		childMenu,
		children,
		className,
		onClick,
	}: ItemProps) {
		return (
			<a
				className={`flex h-10 items-center px-4 text-sm hover:bg-gray-200 ${className}`}
				onClick={onClick}
			>
				{leftIcon}
				{children}
				{rightIcon}
			</a>
		);
	}

	function CommunitiesList({ communities, className }: CommunityProps) {
		const listItems = communities.map((community) => (
			<li key={community.toString()}>
				<DropdownItem
					leftIcon={
						<CommunityAvatar
							name={community}
							small
						/>
					}
					rightIcon={<StarIcon className='ml-auto h-5 w-5 text-gray-500' />}
				>
					<span>r/{community}</span>
				</DropdownItem>
			</li>
		));
		return <ul className='hidden lg:block'>{listItems}</ul>;
	}

	return (
		<div className='absolute top-10 left-0 mx-3 overflow-hidden rounded-md border border-gray-400 bg-white py-1 xl:min-w-[280px]'>
			{option ? (
				<div>
					<DropdownItem
						leftIcon={<HomeIcon className='mr-2 h-5 w-5' />}
						onClick={() => stateChanger(false)}
						className='lg:hidden'
					>
						<span className='font-medium'>Home</span>
					</DropdownItem>
					<DropdownItem
						leftIcon={<ArrowTrendingUpIcon className='mr-2 h-5 w-5' />}
						onClick={() => stateChanger(false)}
						className='lg:hidden'
					>
						<span className='font-medium'>Popular</span>
					</DropdownItem>
					<DropdownItem className='hidden py-0 hover:bg-white lg:flex'>
						<form className='flex-1 cursor-pointer items-center rounded-sm border-gray-200 bg-gray-100 p-1.5 ring-1 ring-inset ring-blue-500'>
							<input
								className='bg-transparent text-sm outline-none'
								type='text'
								placeholder='Filter'
							/>
							<button
								type='submit'
								hidden
							/>
						</form>
					</DropdownItem>
					<DropdownItem className='hidden hover:bg-white lg:flex'>
						<span className='ml-2 text-[10px] font-medium text-gray-500'>
							YOUR COMMUNITIES
						</span>
					</DropdownItem>
					<DropdownItem
						leftIcon={<PlusIcon className='mx-2 hidden h-7 w-7 lg:block' />}
						className='hidden xl:flex'
					>
						<span>Create Community</span>
					</DropdownItem>
					<CommunitiesList communities={communities} />
				</div>
			) : (
				<DropdownItem>Log Out</DropdownItem>
			)}
		</div>
	);
}

export default DropdownMenu;
