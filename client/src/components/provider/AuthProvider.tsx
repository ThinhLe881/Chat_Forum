import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../features/user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<boolean>(localStorage.getItem('auth-token') ? true : false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('auth-token');
		const userId = localStorage.getItem('user-id');

		if (token && userId) {
			axios({
				method: 'get',
				url: `/users/${userId}`,
				headers: {
					'auth-token': token,
				},
			}).then((res) => {
				const user: User = {
					id: res.data.user._id,
					name: res.data.user.name,
					email: res.data.user.email,
					posts: res.data.user.posts,
					comments: res.data.user.comments,
					votes: res.data.user.votes,
				};
				setUser(user);
			});
		}

		setUser(null);
	}, [auth]);

	return <AuthContext.Provider value={{ auth, user, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
