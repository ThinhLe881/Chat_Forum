import { ChevronDownIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
	BellIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	PlusIcon,
	ArrowTrendingUpIcon,
	CircleStackIcon,
	MegaphoneIcon,
	SparklesIcon,
} from '@heroicons/react/24/outline';
import Logo1 from '../assets/logo-1.png';
import Logo2 from '../assets/logo-2.png';
import Logo3 from '../assets/logo-3.png';
import Avatar from './Avatar';

function Header() {
	const auth = true;
	const page = 'Home';
	const username = 'Thinhisme';
	const votes = 1000;

	return (
		<div className='sticky top-0 z-50 flex h-12 justify-between border bg-white px-2 shadow-sm md:px-4'>
			<div className='flex items-center gap-x-2 md:gap-x-5'>
				<div className='relative flex w-8 flex-shrink-0 cursor-pointer items-center xl:w-20'>
					<img
						className='hidden xl:block'
						src={Logo1}
					/>
					<img
						className='xl:hidden'
						src={Logo2}
					/>
				</div>

				<div
					className='my-1 flex cursor-pointer items-center rounded-md bg-gray-200 p-2
			 hover:bg-gray-300 xl:min-w-[280px]'
				>
					<HomeIcon className='hidden h-5 w-5 lg:block' />
					<p className='mx-2 flex-1 text-sm font-medium'>{page}</p>
					<ChevronDownIcon className='ml-1 h-5 w-5 p-0.5' />
				</div>
			</div>

			<form
				className='my-1 ml-5 mr-3 hidden flex-1 cursor-pointer items-center space-x-2 rounded-full
       border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-500 hover:ring-1 md:flex'
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

			<div className='hidden items-center space-x-2 text-gray-600 md:inline-flex'>
				<ArrowTrendingUpIcon className='icon hidden lg:block' />
				<CircleStackIcon className='icon hidden lg:block' />
				<MegaphoneIcon className='icon hidden lg:block' />
				<hr className='hidden h-8 border border-gray-200 lg:block' />
				<SparklesIcon className='icon' />
				<ChatBubbleOvalLeftEllipsisIcon className='icon' />
				<BellIcon className='icon' />
				<PlusIcon className='icon' />
			</div>

			{auth ? (
				<div
					className='my-1 ml-5 hidden cursor-pointer items-center justify-between space-x-2 
			rounded-md border bg-gray-200 px-2 py-1 hover:bg-gray-300 lg:flex lg:min-w-[220px]'
				>
					<div className='flex flex-row items-center space-x-3'>
						<Avatar small />
						<div className='flex flex-col justify-center'>
							<p className='text-sm font-medium'>{username}</p>
							<p className='text-xs font-medium text-gray-400'>{votes} votes</p>
						</div>
					</div>
					<ChevronDownIcon className='ml-2 block h-5 w-5 p-0.5 text-gray-500' />
				</div>
			) : (
				<div
					className='my-1 ml-5 hidden cursor-pointer items-center justify-center space-x-2 
			rounded-full border bg-gray-200 p-2 hover:bg-gray-300 lg:flex lg:min-w-[100px]'
				>
					<div className='relative h-6 w-6 flex-shrink-0'>
						<img src={Logo3} />
					</div>
					<p className='text-sm font-medium'>Log In</p>
				</div>
			)}

			<div className='flex items-center justify-evenly gap-x-2 lg:hidden'>
				<MagnifyingGlassIcon
					className='h-7 w-7 cursor-pointer rounded-sm p-0.5 text-gray-600 md:hidden
        lg:hover:bg-gray-200'
				/>
				<Avatar small />
			</div>
		</div>
	);
}

export default Header;
