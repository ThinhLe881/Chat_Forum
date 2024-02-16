import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { User } from '../features/user';

interface IAuthContext {
	auth: boolean;
	user: null | User;
	setAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
	auth: false,
	user: null,
	setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);