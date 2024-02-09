import React from 'react';

const FormCard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='w-full max-w-md rounded-3xl bg-white px-14 pb-14 pt-8'>{children}</div>
		</div>
	);
};

export default FormCard;
