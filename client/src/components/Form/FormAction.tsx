import { FormEventHandler } from 'react';

type Props = {
	handler: React.FormEventHandler;
	action?: 'submit' | 'reset';
	text: string;
};

export default function FormAction({ handler, action = 'submit', text }: Props) {
	return (
		<>
			{action === 'submit' ? (
				<button
					type={action}
					className='group relative mt-5 flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2'
					onSubmit={handler}
				>
					{text}
				</button>
			) : (
				<button
					type={action}
					className=''
					onReset={handler}
				>
					{text}
				</button>
			)}
		</>
	);
}
