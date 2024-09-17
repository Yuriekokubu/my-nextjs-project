"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Adjust the import path as necessary

const Header: React.FC = () => {
	const { isAuthenticated, username, logout } = useAuth();

	return (
		<header className="bg-white border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<nav className="flex items-center space-x-4">
					<Link href="/" className="text-xl font-bold">
						Budget App
					</Link>
					<Link href="/add" className="text-sm">
						Add
					</Link>
					<Link href="/approval" className="text-sm">
						Approval
					</Link>
				</nav>
				<div className="text-sm">
					{isAuthenticated ? (
						<>
							{username} |{" "}
							<button
								onClick={() => {
									logout();
									window.location.href = "/login"; // Redirect to login page
								}}
								className="text-blue-600 hover:underline"
							>
								Logout
							</button>
						</>
					) : (
						<Link href="/login" className="text-blue-600 hover:underline">
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
