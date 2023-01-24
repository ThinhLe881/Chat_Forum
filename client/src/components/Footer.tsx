import { HomeIcon } from '@heroicons/react/24/solid';
import {
	BellIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	PlusIcon,
	SparklesIcon,
} from '@heroicons/react/24/outline';

function Footer() {
	return (
		<div className='fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t-2 border-gray-300 bg-white px-2 shadow-sm md:hidden'>
			<HomeIcon className='icon' />
			<SparklesIcon className='icon' />
			<PlusIcon className='icon' />
			<ChatBubbleOvalLeftEllipsisIcon className='icon' />
			<BellIcon className='icon' />
		</div>
	);
}

export default Footer;
