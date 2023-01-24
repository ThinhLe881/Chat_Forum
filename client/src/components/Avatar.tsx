import React from 'react';

type Props = {
	userId: string;
	small?: boolean;
	large?: boolean;
	gray?: boolean;
};

function Avatar({ userId, small, large, gray }: Props) {
	return (
		<div
			className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white ${
				small && 'h-7 w-7'
			} ${large && 'h-20 w-20'}
			${gray && 'bg-gray-200'}`}
		>
			<img src={`https://avatars.dicebear.com/api/open-peeps/${userId}.svg`} />
		</div>
	);
}

export default Avatar;
