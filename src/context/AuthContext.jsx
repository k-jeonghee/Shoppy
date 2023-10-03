import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const authContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		onUserStateChange(setUser);
	}, []);

	return (
		<authContext.Provider value={{ user, login, logout }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuthContext = () => {
	return useContext(authContext);
};
