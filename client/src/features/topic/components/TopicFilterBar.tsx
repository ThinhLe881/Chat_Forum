const TopicFilterBar = () => {
	return (
		<form className='hidden max-h-8 w-60 cursor-pointer items-center border border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-500 hover:ring-1 md:flex'>
			<input
				className='bg-transparent text-sm outline-none'
				type='text'
				id='filter-topic'
				name='filter-topic'
				placeholder='Filter'
			/>
		</form>
	);
};

export default TopicFilterBar;
