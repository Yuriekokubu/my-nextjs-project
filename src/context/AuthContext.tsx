"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	username: string | null;
	owner_id: number | null;
	login: (username: string, token: string, owner_id: number) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const getTokenFromLocalStorage = () => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("token");
		}
		return null; 
	};

	const initialToken = getTokenFromLocalStorage();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialToken);
	const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
	const [owner_id, setOwnerID] = useState<number | null>(localStorage.getItem("owner_id") ? Number(localStorage.getItem("owner_id")) : null);

	useEffect(() => {
		if (initialToken) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
			setUsername(null);
			setOwnerID(null);
		}
	}, []);

	const login = (username: string, token: string, owner_id: number) => {
		setIsAuthenticated(true);
		setUsername(username);
		setOwnerID(owner_id);
		localStorage.setItem("token", token);
		localStorage.setItem("username", username);
		localStorage.setItem("owner_id", owner_id.toString());
		document.cookie = `token=Bearer ${token}; path=/; max-age=${2592000}`;
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUsername(null);
		setOwnerID(null);
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("owner_id");
		document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	};

	return <AuthContext.Provider value={{ isAuthenticated, username, owner_id, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
