import { ChevronDownIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
	BellIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	PlusIcon,
	ArrowTrendingUpIcon,
	CircleStackIcon,
	MegaphoneIcon,
	SparklesIcon,
	Bars3Icon,
} from '@heroicons/react/24/outline';
import Logo from '../assets/header-icon.png';

function Header() {
	return (
		<div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
			<div className='h-15 relative flex w-20 flex-shrink-0 cursor-pointer items-center'>
				<img src={Logo} />
			</div>

			<div className='mx-6 flex cursor-pointer items-center rounded-sm p-2 hover:bg-gray-100 xl:min-w-[300px]'>
				<HomeIcon className='h-5 w-5' />
				<p className='mx-2 hidden flex-1 lg:inline'>Home</p>
				<ChevronDownIcon className='h-5 w-5' />
			</div>

			<form
				className='flex flex-1 cursor-pointer items-center space-x-2
       rounded-full border-gray-200 bg-gray-100 px-3 py-1 hover:ring-1'
			>
				<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
				<input
					className='flex-1 bg-transparent outline-none'
					type='text'
					placeholder='Search'
				/>
				<button
					type='submit'
					hidden
				/>
			</form>

			<div className='mx-5 hidden items-center space-x-2 text-gray-600 lg:inline-flex'>
				<ArrowTrendingUpIcon className='icon' />
				<CircleStackIcon className='icon' />
				<MegaphoneIcon className='icon' />
				<SparklesIcon className='icon' />
				<hr className='h-10 border border-gray-200' />
				<ChatBubbleOvalLeftEllipsisIcon className='icon' />
				<BellIcon className='icon' />
				<PlusIcon className='icon' />
			</div>

			<div className='ml-5 flex items-center lg:hidden'>
				<Bars3Icon className='icon' />
			</div>
		</div>
	);
}

export default Header;
