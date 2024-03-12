import TopicFilterBar from './TopicFilterBar';

type Props = {
	open: boolean;
};

const TopicDropdown = ({ open }: Props) => {
	return (
		<>
			{open && (
				<div className='absolute right-0 top-9 z-10 flex h-80 w-72 flex-col items-center justify-between overflow-y-scroll rounded-md border border-t-0 bg-white py-4'>
					<TopicFilterBar />
				</div>
			)}
		</>
	);
};

export default TopicDropdown;
