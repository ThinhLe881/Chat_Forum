import React from 'react';

type Props = {
	children: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onClick?: React.MouseEventHandler;
};

const DropdownItem = ({ children, leftIcon, rightIcon, onClick }: Props) => {
	return (
		<div
			className={`flex  items-center justify-between p-2.5 ${
				!onClick ? 'cursor-text' : 'cursor-pointer hover:bg-slate-100'
			}`}
			onClick={onClick ? onClick : (e) => e.stopPropagation()}
		>
			<div className='mx-2 min-w-6'>{leftIcon}</div>
			<div className={`flex-grow text-sm font-medium ${!onClick && 'text-slate-500'}`}>
				{children}
			</div>
			<div className='mx-2 min-w-6'>{rightIcon}</div>
		</div>
	);
};

export default DropdownItem;
