import React from 'react';

type Props = {
	name: string;
	small?: boolean;
	large?: boolean;
};

function CommunityAvatar({ name, small, large }: Props) {
	return (
		<div
			className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-gray-300 ${
				small && 'h-7 w-7'
			} ${large && 'h-20 w-20'}`}
		>
			<img src={`https://avatars.dicebear.com/api/open-peeps/${name}.svg`} />
		</div>
	);
}

export default CommunityAvatar;
