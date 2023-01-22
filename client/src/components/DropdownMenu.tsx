import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

function DropdownMenu(props: { option: boolean; stateChanger: (state: boolean) => void }) {
	// props.option is true if the dropdown menu is for page selection, false for user settings
	function DropdownItem(props: {
		leftIcon: React.ReactNode;
		rightIcon: React.ReactNode;
		childMenu: React.ReactNode;
		children: String;
	}) {
		return (
			<a className='flex h-10 items-center p-2 text-sm font-medium transition-all duration-300 hover:bg-gray-200'>
				<span className='mr-2 hidden h-5 w-5 lg:block'>{props.leftIcon}</span>
				{props.children}
				<span className='ml-auto'>{props.rightIcon}</span>
			</a>
		);
	}

	return (
		<div
			className='absolute top-10 left-0 mx-3 overflow-hidden rounded-md border border-gray-400 bg-white xl:min-w-[280px]'
			onClick={() => props.stateChanger(false)}
		>
			{props.option ? (
				<div>
					<DropdownItem
						leftIcon={<HomeIcon />}
						rightIcon={undefined}
						childMenu={undefined}
					>
						Home
					</DropdownItem>
					<DropdownItem
						leftIcon={<ArrowTrendingUpIcon />}
						rightIcon={undefined}
						childMenu={undefined}
					>
						Popular
					</DropdownItem>
				</div>
			) : (
				<DropdownItem
					leftIcon={undefined}
					rightIcon={undefined}
					childMenu={undefined}
				>
					Log Out
				</DropdownItem>
			)}
		</div>
	);
}

export default DropdownMenu;
