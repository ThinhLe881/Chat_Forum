import Logo from './Logo';
import UserStatus from './UserStatus';

const NavBar = () => {
	return (
		<div className='sticky top-0 z-50 bg-white px-2 py-1 shadow-sm md:px-4'>
			<div className='flex items-center justify-between'>
				<Logo />
				<UserStatus />
			</div>
		</div>
	);
};

export default NavBar;
