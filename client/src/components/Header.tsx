import { useState } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	HomeIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {
	ArrowLeftIcon,
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
	const [openPage, setOpenPage] = useState(false);
	const [openUser, setOpenUser] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);

	const auth = true;
	const page = 'Home';
	const username = 'Thinhisme';
	const userId = '63af5463218aecbee5bde0bc';
	const votes = 1000;

	return (
		<div>
			<div className='sticky top-0 z-50 border-gray-300 bg-white px-2 py-1 shadow-sm max-md:border-b-2 md:px-4'>
				{openSearch ? (
					// For mobile view
					<div className='flex items-center'>
						<div>
							<ArrowLeftIcon
								className='icon mr-2'
								onClick={() => {
									setOpenSearch(false);
								}}
							/>
						</div>
						<form className='flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-gray-300 bg-gray-200 px-3 py-1'>
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
					</div>
				) : (
					<div className='flex items-center'>
						<div className='relative flex w-8 flex-shrink-0 cursor-pointer items-center xl:w-20'>
							<img
								className='hidden xl:block'
								src={Logo1}
							/>
							{/* For mobile view */}
							<img
								className='xl:hidden'
								src={Logo2}
							/>
						</div>

						<div className='relative flex flex-col'>
							<div
								className={`mx-3 rounded-md border bg-gray-200 p-2 lg:bg-white xl:min-w-[280px] ${
									openPage
										? 'border-gray-400 hover:border-gray-600'
										: 'border-white hover:border-gray-200'
								}`}
								onClick={() => {
									setOpenPage(!openPage),
										setOpenUser(false),
										setOpenSearch(false);
								}}
							>
								<div className='flex items-center'>
									<HomeIcon className='mr-2 hidden h-5 w-5 lg:block' />
									<span className='text-sm font-medium'>{page}</span>
									{openPage ? (
										<ChevronUpIcon className='ml-2 h-4 w-4 lg:ml-auto' />
									) : (
										<ChevronDownIcon className='ml-2 h-4 w-4 lg:ml-auto' />
									)}
								</div>
							</div>
							{openPage === true && (
								<DropdownMenu
									option={'page'}
									stateChanger={setOpenPage}
								/>
							)}
						</div>

						<form className='mx-3 hidden flex-1 cursor-pointer items-center space-x-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 ring-inset ring-blue-500 hover:ring-1 md:flex'>
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
							<div className='relative ml-auto flex flex-col md:ml-4'>
								<div className='flex items-center justify-evenly gap-x-3 '>
									{/* For mobile view */}
									<div
										className='md:hidden'
										onClick={() => {
											setOpenSearch(!openSearch),
												setOpenPage(false),
												setOpenUser(false);
										}}
									>
										<MagnifyingGlassIcon className='icon h-7 w-7 p-0.5' />
									</div>
									{/* For desktop view */}
									<div
										onClick={() => {
											setOpenUser(!openUser),
												setOpenPage(false),
												setOpenSearch(false);
										}}
									>
										<div
											className={`hidden min-w-[150px] cursor-pointer items-center rounded-md border px-2 py-1 md:flex lg:min-w-[220px] ${
												openUser
													? 'border-gray-400 hover:border-gray-600'
													: 'border-white hover:border-gray-200'
											}`}
										>
											<Avatar
												userId={userId}
												small
											/>
											<div className='ml-2 flex flex-col justify-center'>
												<span className='text-xs font-medium'>
													{username}
												</span>
												<span className='text-xs font-medium text-gray-400'>
													{votes} votes
												</span>
											</div>
											{openUser ? (
												<ChevronUpIcon className='ml-auto h-4 w-4' />
											) : (
												<ChevronDownIcon className='ml-auto h-4 w-4' />
											)}
										</div>
										{/* For mobile view */}
										<div
											className={`rounded-full border bg-gray-200 md:hidden ${
												openUser ? 'border-gray-600' : 'border-white'
											}`}
										>
											<Avatar
												userId={userId}
												small
												gray
											/>
										</div>
									</div>
								</div>
								{openUser === true && (
									<DropdownMenu
										option={'user'}
										stateChanger={setOpenUser}
									/>
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
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
