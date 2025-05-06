import React, {createContext, useContext, useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
	const [auth, setAuth] = useState(false);
	const getAuth = async () => {
		try {
			const detail = await axiosInstance.get("/auth/check");
			if (detail.status !== 401) setAuth(detail);
		} catch (error) {
			console.log("error while fetching authuser");
		}
	};
	useEffect(() => {
		getAuth();
	}, getAuth);
	return (
		<AuthContext.Provider value={{auth, setAuth}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
