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
import Logo1 from '../assets/logo-1.png';
import Logo2 from '../assets/logo-2.png';
import Logo3 from '../assets/logo-3.png';
import Avatar from './Avatar';

function Header() {
	const auth = true;

	return (
		<div className='sticky top-0 z-50 flex h-12 justify-evenly border bg-white shadow-sm md:px-4'>
			<div className='relative flex w-8 flex-shrink-0 cursor-pointer items-center md:w-20'>
				<img
					className='hidden md:block'
					src={Logo1}
				/>
				<img
					className='md:hidden'
					src={Logo2}
				/>
			</div>

			<div
				className='my-1 flex cursor-pointer items-center rounded-md p-2
			 hover:bg-gray-200 md:mx-5 xl:min-w-[280px]'
			>
				<HomeIcon className='h-5 w-5' />
				<p className='mx-2 hidden flex-1 text-sm font-medium xl:inline'>Home</p>
				<ChevronDownIcon className='ml-1 hidden h-5 w-5  p-0.5 sm:block' />
			</div>

			<form
				className='my-1 flex max-w-[200px] flex-1 cursor-pointer items-center space-x-2
       rounded-full border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-300 hover:ring-1 md:max-w-none'
			>
				<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
				<input
					className='flex-1 bg-transparent text-sm outline-none'
					type='text'
					placeholder='Search'
				/>
				<button
					type='submit'
					hidden
				/>
			</form>

			<div
				className='hidden items-center space-x-2 text-gray-600 sm:inline-flex 
			lg:mx-5'
			>
				<ArrowTrendingUpIcon className='icon' />
				<CircleStackIcon className='icon' />
				<MegaphoneIcon className='icon' />
				<SparklesIcon className='icon' />
				<hr className='h-8 border border-gray-200' />
				<ChatBubbleOvalLeftEllipsisIcon className='icon' />
				<BellIcon className='icon' />
				<PlusIcon className='icon' />
			</div>

			{auth ? (
				<div
					className='my-1 hidden cursor-pointer items-center justify-between space-x-2 
			rounded-md border bg-gray-100 px-2 py-1 hover:bg-gray-200 lg:flex lg:min-w-[220px]'
				>
					<div className='flex flex-row items-center space-x-3'>
						<Avatar small />
						<div className='flex flex-col justify-center'>
							<p className='text-sm font-medium'>Thinhisme</p>
							<p className='text-xs font-medium text-gray-400'>1000 votes</p>
						</div>
					</div>
					<ChevronDownIcon className='ml-2 block h-5 w-5 p-0.5 text-gray-500' />
				</div>
			) : (
				<div
					className='my-1 hidden cursor-pointer items-center justify-center space-x-2 
			rounded-full border bg-gray-100 p-2 hover:bg-gray-200 lg:flex lg:min-w-[100px]'
				>
					<div className='relative h-6 w-6 flex-shrink-0'>
						<img src={Logo3} />
					</div>
					<p className='text-sm font-medium'>Log In</p>
				</div>
			)}

			<div className='flex items-center lg:hidden'>
				<Bars3Icon className='icon' />
			</div>
		</div>
	);
}

export default Header;
