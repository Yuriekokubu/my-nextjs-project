import type { Metadata } from "next";
import "./globals.css";
import { BudgetProvider } from "@/context/BudgetContext";
import { AuthProvider } from "@/context/AuthContext"; // Adjust the import path as necessary
import Header from "@/components/Header/Header";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mali:wght@400;700&display=swap" />
			</head>
			<body style={{ fontFamily: "Mali, sans-serif" }}>
				<AuthProvider>
					<Header />
					<BudgetProvider>{children}</BudgetProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
