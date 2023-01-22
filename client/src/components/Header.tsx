import { useState } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	HomeIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
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
import Logo4 from '../assets/logo-4.png';
import Avatar from './Avatar';
import DropdownMenu from './DropdownMenu';

function Header() {
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);

	const auth = true;
	const page = 'Home';
	const username = 'Thinhisme';
	const votes = 1000;

	return (
		<div className='sticky top-0 z-50 flex items-center bg-white px-2 py-1 shadow-sm md:px-4'>
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

			<div className='relative flex flex-col'>
				<div
					className={`mx-3 rounded-md border p-2 xl:min-w-[280px] ${
						open1
							? 'border-gray-400 hover:border-gray-600'
							: 'border-white hover:border-gray-200'
					}`}
					onClick={() => setOpen1(!open1)}
				>
					<div className='flex items-center'>
						<HomeIcon className='mr-2 hidden h-5 w-5 lg:block' />
						<span className='text-sm font-medium'>{page}</span>
						{open1 ? (
							<ChevronUpIcon className='ml-2 h-4 w-4 lg:ml-auto' />
						) : (
							<ChevronDownIcon className='ml-2 h-4 w-4 lg:ml-auto' />
						)}
					</div>
				</div>
				{open1 === true && (
					<DropdownMenu
						option={true}
						stateChanger={setOpen1}
					/>
				)}
			</div>

			<form className='mx-3 hidden flex-1 cursor-pointer items-center space-x-2 rounded-full border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-500 hover:ring-1 md:flex'>
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

			{auth ? (
				<div className='hidden items-center space-x-2 text-gray-600 md:flex'>
					<ArrowTrendingUpIcon className='icon hidden lg:block' />
					<CircleStackIcon className='icon hidden lg:block' />
					<MegaphoneIcon className='icon hidden lg:block' />
					<hr className='hidden h-8 border border-gray-200 lg:block' />
					<SparklesIcon className='icon' />
					<ChatBubbleOvalLeftEllipsisIcon className='icon' />
					<BellIcon className='icon' />
					<PlusIcon className='icon' />
				</div>
			) : (
				<div></div>
			)}

			{auth ? (
				<div
					className='ml-5 hidden cursor-pointer items-center rounded-md border border-white px-2 py-1 hover:border-gray-200 lg:flex lg:min-w-[220px]'
					onClick={() => setOpen2(!open2)}
				>
					<Avatar small />
					<div className='ml-2 flex flex-col justify-center'>
						<span className='text-xs font-medium'>{username}</span>
						<span className='text-xs font-medium text-gray-400'>{votes} votes</span>
					</div>
					{open2 ? (
						<ChevronUpIcon className='ml-2 h-4 w-4 lg:ml-auto' />
					) : (
						<ChevronDownIcon className='ml-2 h-4 w-4 lg:ml-auto' />
					)}
				</div>
			) : (
				<div className='flex items-center justify-evenly lg:min-w-[350px]'>
					<div className='hidden cursor-pointer items-center justify-center space-x-2 rounded-full border bg-slate-200 p-2 lg:flex lg:min-w-[150px]'>
						<div className='relative h-6 w-6 flex-shrink-0'>
							<img src={Logo3} />
						</div>
						<p className='text-sm font-medium'>Sign Up</p>
					</div>
					<div className='hidden cursor-pointer items-center justify-center space-x-2 rounded-full border bg-orange-600 p-2 lg:flex lg:min-w-[150px]'>
						<div className='relative h-6 w-6 flex-shrink-0'>
							<img src={Logo4} />
						</div>
						<p className='text-sm font-medium text-white'>Log In</p>
					</div>
				</div>
			)}

			<div className='ml-auto flex items-center justify-evenly gap-x-3 lg:hidden'>
				<MagnifyingGlassIcon className='icon h-7 w-7 p-0.5' />
				<div>
					<Avatar small />
				</div>
			</div>
		</div>
	);
}

export default Header;
