type Props = {
	icon: string;
	text: string;
	bgColor: string;
	bgColorHover: string;
	txtColor: string;
	onClick: React.MouseEventHandler;
};

const Button = ({ icon, text, bgColor, bgColorHover, txtColor, onClick }: Props) => {
	return (
		<button
			onClickCapture={onClick}
			className={`hidden cursor-pointer items-center justify-center space-x-2 rounded-full border ${bgColor} p-2 px-4 ${bgColorHover} lg:flex`}
		>
			<img
				className='relative h-6 w-6 flex-shrink-0'
				src={icon}
			/>
			<p className={`text-sm font-medium ${txtColor}`}>{text}</p>
		</button>
	);
};

export default Button;
