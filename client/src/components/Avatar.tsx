import React from 'react';

type Props = {
	seed?: string;
	small?: boolean;
	large?: boolean;
};

function Avatar({ seed, small, large }: Props) {
	const userId = '63af5463218aecbee5bde0bc';
	return (
		<div
			className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${
				small && 'h-7 w-7 flex-shrink-0'
			} ${large && 'h-20 w-20'}`}
		>
			<img
				src={`https://avatars.dicebear.com/api/open-peeps/${userId || 'placeholder'}.svg`}
			/>
		</div>
	);
}

export default Avatar;
