"use client";

import { useForm } from "react-hook-form";
import { createBudgetItem } from "@/services/budget-item"; // Import the API function
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import the Auth context

type FormData = {
	title: string;
	quantity: number;
	amount: number;
};

function AddBudgetRequest() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: {
			title: "",
			quantity: 1,
			amount: 0,
		},
	});

	const router = useRouter();
	const { owner_id, isAuthenticated } = useAuth(); // Use Auth context

	// Handle form submission
	const onSubmit = async (data: FormData) => {
		if (!isAuthenticated) {
			alert("You must be logged in to add a budget request.");
			return;
		}

		if (owner_id === null) {
			alert("Owner ID is missing.");
			return;
		}

		try {
			await createBudgetItem({
				title: data.title,
				quantity: Number(data.quantity),
				amount: Number(data.amount),
				owner_id: Number(owner_id), // Pass the owner_id from Auth context
			});
			alert("Budget request added successfully!");
			reset(); // Reset form fields after success
			router.push("/"); // Redirect to the entry page after success
		} catch (error) {
			console.error("Error adding budget request:", error);
			alert("Failed to add budget request. Please try again.");
		}
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-6">Add Budget Request</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label htmlFor="title" className="block text-lg font-medium">
								Title
							</label>
							<input type="text" id="title" {...register("title", { required: true, minLength: 3 })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
							{errors.title && (
								<p className="mt-1 text-sm text-red-600">
									{errors.title.type === "required" && "Title is required"}
									{errors.title.type === "minLength" && "Title must be at least 3 characters"}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="quantity" className="block text-lg font-medium">
								Quantity
							</label>
							<input type="number" id="quantity" {...register("quantity", { required: true, min: 1 })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
							{errors.quantity && (
								<p className="mt-1 text-sm text-red-600">
									{errors.quantity.type === "required" && "Quantity is required"}
									{errors.quantity.type === "min" && "Quantity must be greater than 0"}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="amount" className="block text-lg font-medium">
								Amount
							</label>
							<input type="number" id="amount" {...register("amount", { required: true, min: 1 })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
							{errors.amount && (
								<p className="mt-1 text-sm text-red-600">
									{errors.amount.type === "required" && "Amount is required"}
									{errors.amount.type === "min" && "Amount must be greater than 0"}
								</p>
							)}
						</div>
						<div className="flex space-x-2">
							<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
								Submit
							</button>
							<Link href="/entry" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
								Back
							</Link>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default AddBudgetRequest;
