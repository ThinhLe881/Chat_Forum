type Props = {
	userId: string;
};

const UserAvatar = ({ userId }: Props) => {
	return (
		<div className={`relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-white`}>
			<img src={`https://robohash.org/${userId}`} />
		</div>
	);
};

export default UserAvatar;
