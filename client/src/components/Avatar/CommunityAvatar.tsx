type Props = {
	name: string;
};

const CommunityAvatar = ({ name }: Props) => {
	return (
		<div
			className={`'h-7 w-7' relative h-10 w-10 flex-shrink-0 overflow-hidden
			rounded-full border-gray-300`}
		>
			<img src={`https://avatars.dicebear.com/api/open-peeps/${name}.svg`} />
		</div>
	);
};

export default CommunityAvatar;
