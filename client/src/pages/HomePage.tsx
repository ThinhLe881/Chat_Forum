import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
	const [authenticated, setAuthenticated] = useState(() => {
		return localStorage.getItem('token') ? true : false;
	});

	useEffect(() => {
		const user = localStorage.getItem('token');
		setAuthenticated(user ? true : false);
	}, []);

	if (!authenticated) {
		return (
			<Navigate
				to='/login'
				replace={true}
			/>
		);
	} else {
		return (
			<>
				<div className='text-center font-sans text-2xl font-extrabold text-orange-600'>
					Welcome to Chat Forum
				</div>
			</>
		);
	}
};

export default HomePage;
