import React from 'react';

const FormCard = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='w-full max-w-xs rounded-3xl bg-white px-4 pb-4 md:max-w-md md:px-14 md:pb-14 md:pt-8'>
				{children}
			</div>
		</div>
	);
};

export default FormCard;
