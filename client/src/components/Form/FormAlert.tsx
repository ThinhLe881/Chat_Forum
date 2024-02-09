type Props = {
	text: string;
	success: boolean;
};

const FormAlert = ({ text, success }: Props) => {
	return text ? (
		<div
			className={`my-2 rounded-lg border p-4 text-sm ${
				success
					? 'border-green-400 bg-green-100 text-green-800'
					: 'border-red-400 bg-red-100 text-red-800'
			}`}
			role='alert'
		>
			<span className='font-medium'>{success ? 'Congratulations! ' : 'Sorry! '}</span>
			{text}
		</div>
	) : (
		<></>
	);
};

export default FormAlert;
