"use client";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FormEvent, ChangeEvent, useState } from "react";
import { Container, Form, Title, Label, InputWrapper, Input, Button, Spinner, EyeIcon } from "@/app/login/style"; // Reuse styles from login page
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function SignUpPage() {
	const [credential, setCredential] = useState({
		username: "",
		password: "",
		confirmPassword: "", // Confirm Password field
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		// Check if passwords match
		if (credential.password !== credential.confirmPassword) {
			alert("Passwords do not match!");

			// Clear both password and confirm password fields
			setCredential((prev) => ({
				...prev,
				password: "",
				confirmPassword: "",
			}));
			setIsSubmitting(false);
			return;
		}

		try {
			// Call the signup API
			const response = await api.post("/signup", {
				username: credential.username,
				password: credential.password,
			});

			alert("Sign up successful!");

			// Redirect to login page after successful signup
			router.push("/login");
		} catch (err) {
			alert("Sign up failed");
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
				<Title>Sign Up</Title>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input type="text" id="username" name="username" required onChange={handleChange} value={credential.username} />
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<InputWrapper>
						<Input
							type={showPassword ? "text" : "password"} // Toggle input type based on state
							id="password"
							name="password"
							required
							onChange={handleChange}
							value={credential.password} // Bind the value to state
						/>
						<EyeIcon onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
						</EyeIcon>
					</InputWrapper>
				</div>
				<div>
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<InputWrapper>
						<Input
							type={showPassword ? "text" : "password"} // Toggle input type based on state
							id="confirmPassword"
							name="confirmPassword"
							required
							onChange={handleChange}
							value={credential.confirmPassword} // Bind the value to state
						/>
					</InputWrapper>
				</div>
				<Button type="submit" $isSubmitting={isSubmitting} disabled={isSubmitting}>
					{isSubmitting ? <Spinner /> : "Sign Up"}
				</Button>
			</Form>
		</Container>
	);
}

export default SignUpPage;
