import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<div>
			<NavBar />
			<div className='flex h-screen min-h-full items-center justify-center bg-blue-50'>
				<div className='w-full max-w-5xl space-y-8'>
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
		</div>
	);
};

export default App;
