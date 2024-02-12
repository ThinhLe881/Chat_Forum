type Props = {
	isChecked: boolean;
};

const ToggleButton = ({ isChecked }: Props) => {
	return (
		<label className='relative flex cursor-pointer items-center justify-center'>
			<input
				type='checkbox'
				value=''
				className='peer sr-only'
				checked={isChecked}
				disabled
			></input>
			<div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-orange-800"></div>{' '}
		</label>
	);
};

export default ToggleButton;
