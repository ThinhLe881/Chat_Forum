import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<div className='flex h-screen min-h-full items-center justify-center bg-blue-50 px-4 py-12 sm:px-6 lg:px-8'>
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
							element={<HomePage />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
