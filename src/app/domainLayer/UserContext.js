// import { createContext } from "react";

// export const UserContext = createContext(null);
import React, { useState, createContext } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [ user, setUser ] = useState(null);

	console.log('usercontext', user);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;