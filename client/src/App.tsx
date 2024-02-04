import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<div className='flex h-screen min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-8'>
				<BrowserRouter>
					<Routes>
						<Route
							path='/login'
							element={<LoginPage />}
						/>
						<Route
							path='/register'
							element={<RegisterPage />}
						/>
						<Route
							path='/'
							element={
								<Navigate
									to='/login'
									replace={true}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
