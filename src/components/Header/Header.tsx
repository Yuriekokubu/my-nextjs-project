"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Adjust the import path as necessary
import { HeaderContent, HeaderContainer, LinkStyle, LogoLink, Nav } from "./HeaderStyle";

const Header: React.FC = () => {
	const { isAuthenticated, username, logout } = useAuth();

	return (
		<HeaderContainer>
			<HeaderContent>
				<Nav>
					<Link href="/" passHref legacyBehavior>
						<LogoLink>Budget App</LogoLink>
					</Link>
					<Link href="/add" passHref legacyBehavior>
						<LinkStyle>Add</LinkStyle>
					</Link>
					<Link href="/approval" passHref legacyBehavior>
						<LinkStyle>Approval</LinkStyle>
					</Link>
				</Nav>
				<div>
					{isAuthenticated ? (
						<>
							<span>{username} | </span>
							<button
								onClick={() => {
									logout();
									window.location.href = "/login"; // Redirect to login page
								}}
								style={{
									background: "none",
									border: "none",
									color: "#007bff",
									cursor: "pointer",
									textDecoration: "underline",
								}}
							>
								Logout
							</button>
						</>
					) : (
						<Link href="/login" passHref legacyBehavior>
							<LinkStyle>Login</LinkStyle>
						</Link>
					)}
				</div>
			</HeaderContent>
		</HeaderContainer>
	);
};

export default Header;
