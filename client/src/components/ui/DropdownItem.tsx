import React from 'react';

type Props = {
	children: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	childrenStyle?: string;
	onClick?: React.MouseEventHandler;
};

const DropdownItem = ({ children, leftIcon, rightIcon, childrenStyle, onClick }: Props) => {
	return (
		<div
			className={`flex flex-grow cursor-pointer items-center justify-between p-2.5 ${
				onClick && 'hover:bg-slate-100'
			}`}
			onClick={onClick}
		>
			<div className='mx-2 min-w-6'>{leftIcon}</div>
			<div className={childrenStyle}>{children}</div>
			<div className='mx-2 min-w-6'>{rightIcon}</div>
		</div>
	);
};

export default DropdownItem;
