import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../features/user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<boolean>(localStorage.getItem('token') ? true : false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('id');

		if (token && userId) {
			axios({
				method: 'get',
				url: `/users/stats/${userId}`,
				headers: {
					token: token,
				},
			}).then((res) => {
				const user: User = {
					id: res.data._id,
					name: res.data.name,
					email: res.data.email,
					posts: res.data.posts,
					comments: res.data.comments,
					votes: res.data.votes,
				};
				setUser(user);
			});
		}

		setUser(null);
	}, [auth]);

	return <AuthContext.Provider value={{ auth, user, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
