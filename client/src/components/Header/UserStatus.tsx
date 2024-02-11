import { useAuth } from '../../utils/AuthContext';

const UserStatus = () => {
	const { user } = useAuth();

	return <div>{user ? user.name : ''}</div>;
};

export default UserStatus;
