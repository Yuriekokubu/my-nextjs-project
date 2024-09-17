"use client";

import { useEffect, useState } from "react";
import BudgetPanel from "@/components/Panel/BudgetPanel";
import BudgetRequestDataTable from "@/components/BudgetRequestDataTable";
import { fetchBudgetItems } from "@/services/budget-item";
import { useBudget } from "@/context/BudgetContext"; // Import the hook

function Home() {
	const { budgetRequests, setBudgetRequests } = useBudget(); // Use context hook
	const [error, setError] = useState<string | null>(null);

	const loadItems = async () => {
		try {
			const items = await fetchBudgetItems();
			setBudgetRequests(items); // Update context
		} catch (err) {
			setError("Failed to fetch budget items.");
		}
	};

	useEffect(() => {
		loadItems();
	}, [setBudgetRequests]); // Add setBudgetRequests to dependency array

	return (
		<div>
			<main className="container mx-auto">
				{error && <p className="text-red-500">{error}</p>}
				<div className="mt-4">
					<BudgetPanel items={budgetRequests} />
				</div>
				<div className="mt-4">
					<BudgetRequestDataTable items={budgetRequests} />
				</div>
			</main>
		</div>
	);
}

export default Home;
