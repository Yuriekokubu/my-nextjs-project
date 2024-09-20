import styled from "styled-components";

export const HeaderContainer = styled.header`
	position: sticky;
	top: 0;
	width: 100%;
	background-color: white;
	border-bottom: 1px solid #ddd;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 1000; // Ensure it stays above other content
`;

export const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 1200px;
	margin: 0 auto;
	padding: 16px;
`;

export const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const LinkStyle = styled.a`
	color: blue;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

export const LogoLink = styled(LinkStyle)`
	font-size: 1.5rem; // Adjust size as needed
	font-weight: bold;
`;