"use client";

import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext"; // Access the Auth context
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function LoginPage() {
	const [credential, setCredential] = useState({
		username: "",
		password: "",
	});
	const router = useRouter();
	const { login } = useAuth(); // Get login function from context

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.post("/login", {
				username: credential.username,
				password: credential.password,
			});

			// Assuming the API returns token, username, and userID
			const { token, username, userID } = response.data;

			// Update context with username, token, and userID
			login(username, token, userID);

			// Redirect to home page
			router.push("/");
		} catch (err) {
			alert("Login failed");
		}
	};

	return (
		<form className="border rounded-sm max-w-72 p-4" onSubmit={handleSubmit}>
			<div>
				<h1 className="text-2xl font-bold mb-2">Login</h1>
			</div>
			<div>
				<label>Username</label>
				<div>
					<input
						type="text"
						name="username"
						className="border"
						required
						onChange={(event) =>
							setCredential({
								...credential,
								username: event.target.value,
							})
						}
					/>
				</div>
			</div>
			<div>
				<label>Password</label>
				<div>
					<input
						type="password"
						name="password"
						className="border"
						required
						onChange={(event) =>
							setCredential({
								...credential,
								password: event.target.value,
							})
						}
					/>
				</div>
				<button className="bg-blue-500 text-white rounded-md px-2 mt-3">Login</button>
			</div>
		</form>
	);
}

export default LoginPage;
