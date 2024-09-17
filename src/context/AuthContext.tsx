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
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [username, setUsername] = useState<string | null>(null);
	const [owner_id, setOwnerID] = useState<number | null>(null);

	useEffect(() => {
		const checkAuthStatus = () => {
			const cookies = document.cookie.split("; ");
			const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
			if (tokenCookie) {
				const token = tokenCookie.split("=")[1];
				// Optionally, set username and owner_id from token if available
				setIsAuthenticated(!!token);
			} else {
				setIsAuthenticated(false);
				setUsername(null);
				setOwnerID(null);
			}
		};

		checkAuthStatus();
	}, []);

	const login = (username: string, token: string, owner_id: number) => {
		setIsAuthenticated(true);
		setUsername(username);
		setOwnerID(owner_id);
		document.cookie = `token=Bearer ${token}; path=/; max-age=${2592000}`; // Set cookie with 1 month expiration
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUsername(null);
		setOwnerID(null);
		document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear cookie
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
