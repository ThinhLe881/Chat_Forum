import Spinner from '../Utils/Spinner';

type Props = {
	handler: React.FormEventHandler;
	action?: 'submit' | 'reset';
	text: string;
	loading: boolean;
};

const FormAction = ({ handler, action = 'submit', text, loading }: Props) => {
	return (
		<>
			{action === 'submit' ? (
				<button
					disabled={loading}
					type={action}
					className='group relative mt-5 flex w-full justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2'
					onSubmit={handler}
				>
					{loading ? <Spinner /> : text}
				</button>
			) : (
				<></>
			)}
		</>
	);
};

export default FormAction;
