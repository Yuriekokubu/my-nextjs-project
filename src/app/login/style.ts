import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70vh;
`;

export const Form = styled.form`
	border: 1px solid #ccc;
	border-radius: 4px;
	max-width: 500px;
	padding: 16px;
	width: 100%;
	background: #fff;
`;

export const Title = styled.h1`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: 8px;
`;

export const InputWrapper = styled.div`
	position: relative;
`;

export const Input = styled.input`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	width: 100%;
	margin-bottom: 16px;
	padding-right: 36px; // Space for the eye icon
`;

export const Button = styled.button<{ $isSubmitting: boolean }>`
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 12px 16px;
	cursor: pointer;
	font-size: 16px;
	width: 100%; /* Full width */
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	/* Change background color when submitting */
	&:hover {
		background-color: ${({ $isSubmitting }) => ($isSubmitting ? "#007bff" : "#0056b3")};
	}
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const Spinner = styled.div`
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-top: 4px solid #fff;
	border-radius: 50%;
	width: 16px;
	height: 16px;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const EyeIcon = styled.div`
	position: absolute;
	right: 10px;
	top: 36%;
	transform: translateY(-50%);
	cursor: pointer;
	color: #ccc;
`;
