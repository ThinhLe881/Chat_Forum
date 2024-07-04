import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const TopicSearchBar = () => {
	return (
		<form className='mx-3 hidden flex-1 cursor-pointer items-center space-x-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-500 hover:ring-1 md:flex md:max-w-[35rem]'>
			<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
			<input
				className='flex-1 bg-transparent text-sm outline-none'
				type='text'
				id='search-topic'
				name='search-topic'
				placeholder='Search Topic'
			/>
		</form>
	);
};

export default TopicSearchBar;
