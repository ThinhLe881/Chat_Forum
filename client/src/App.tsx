import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	return (
		<div className='h-screen w-screen bg-slate-200'>
			<Header />
			{/* For mobile view */}
			<Footer />
		</div>
	);
}

export default App;
