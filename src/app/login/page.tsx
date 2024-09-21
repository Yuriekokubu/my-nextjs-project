"use client";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent, ChangeEvent, useState } from "react";
import { Container, Form, Title, Label, InputWrapper, Input, Button, Spinner, EyeIcon, SignUpLink } from "@/app/login/style"; // Import styles from the new file
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Link from "next/link"; 

function LoginPage() {
	const [credential, setCredential] = useState({
		username: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await api.post("/login", {
				username: credential.username,
				password: credential.password,
			});

			const { token, username, userID } = response.data;

			login(username, token, userID);

			router.push("/");
		} catch (err) {
			alert("Login failed");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCredential((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Title>Please Sign In</Title>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input type="text" id="username" name="username" required onChange={handleChange} />
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<InputWrapper>
						<Input
							type={showPassword ? "text" : "password"} 
							id="password"
							name="password"
							required
							onChange={handleChange}
						/>
						<EyeIcon onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FaEyeSlash /> : <FaEye />} 
						</EyeIcon>
					</InputWrapper>
					<Button type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
						{isSubmitting ? <Spinner /> : "Login"}
					</Button>
				</div>
				<div>
					<SignUpLink>
						Don't have an account? <Link href="/signup">Sign Up</Link>
					</SignUpLink>{" "}
				</div>
			</Form>
		</Container>
	);
}

export default LoginPage;
