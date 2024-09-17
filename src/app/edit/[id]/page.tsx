"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { editBudgetItem } from "@/services/budget-item";

type FormData = {
	title: string;
	quantity: number;
	amount: number;
};

function EditBudgetRequest() {
	const { id } = useParams(); // Use useParams to get the ID from the URL
	const router = useRouter(); // Use useRouter for redirection

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			title: "",
			quantity: 1,
			amount: 0,
		},
	});

	// Fetch the item by ID when the page loads
	useEffect(() => {
		const fetchItemByID = async () => {
			try {
				if (id) {
					const response = await fetch(`http://localhost:2024/items/${id}`);
					const data = await response.json();

					// Set the form values with the fetched data
					setValue("title", data.title);
					setValue("quantity", data.quantity);
					setValue("amount", data.amount);
				}
			} catch (error) {
				console.error("Error fetching item:", error);
			}
		};

		fetchItemByID();
	}, [id, setValue]);

	// Handle form submission
	const onSubmit = async (data: FormData) => {
		try {
			if (id) {
				console.log("Submitting data:", {
					title: data.title,
					quantity: Number(data.quantity), // Ensure quantity is a number
					amount: Number(data.amount), // Ensure amount is a number
				});

				await editBudgetItem(Number(id), {
					title: data.title,
					quantity: Number(data.quantity), // Ensure quantity is a number
					amount: Number(data.amount), // Ensure amount is a number
				});

				// Show success alert
				alert("Budget item updated successfully!");

				// Redirect to the home page
				router.push("/");
			}
		} catch (error) {
			console.error("Error updating item:", error);
			// Optionally provide feedback to the user
		}
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-6">Edit Budget Request</h2>
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
							<Link href="/" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
								Back
							</Link>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default EditBudgetRequest;
