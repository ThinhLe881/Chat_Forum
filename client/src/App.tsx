import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/NavBar';
import { useAuth } from './utils/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	const { auth } = useAuth();

	return (
		<div>
			<NavBar authenticated={auth} />
			<div className='flex h-screen min-h-full justify-center bg-blue-50'>
				<div className='w-full max-w-5xl space-y-8'>
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
				</div>
			</div>
		</div>
	);
};

export default App;
