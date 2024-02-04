type Props = {
	userId: string;
};

function UserAvatar({ userId }: Props) {
	return (
		<div
			className={`'h-7 w-7' relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-white`}
		>
			<img src={`https://avatars.dicebear.com/api/open-peeps/${userId}.svg`} />
		</div>
	);
}

export default UserAvatar;
