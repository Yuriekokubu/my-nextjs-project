"use client";

import { useEffect, useState } from "react";
import BudgetPanel from "@/components/Panel/BudgetPanel";
import BudgetRequestDataTable from "@/components/BudgetDataTable/BudgetRequestDataTable";
import { fetchBudgetItems, deleteBudgetItems } from "@/services/budget-item"; // Adjust import as necessary
import { useBudget } from "@/context/BudgetContext";

function Home() {
	const { budgetRequests, setBudgetRequests } = useBudget();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadItems = async () => {
			try {
				const items = await fetchBudgetItems();
				setBudgetRequests(items);
			} catch (err) {
				setError("Failed to fetch budget items.");
			}
		};

		loadItems();
	}, [setBudgetRequests]);

	const handleDeleteSelected = async (selectedIds: number[]) => {
		try {
			await deleteBudgetItems(selectedIds);
			setBudgetRequests(budgetRequests.filter((item) => !selectedIds.includes(item.id)));
		} catch (err) {
			setError("Failed to delete selected items.");
		}
	};

	return (
		<div>
			<main className="container mx-auto">
				{error && <p className="text-red-500">{error}</p>}
				<div className="mt-4">
					<BudgetPanel items={budgetRequests} />
				</div>
				<div className="mt-4">
					<BudgetRequestDataTable
						items={budgetRequests}
						onDeleteSelected={handleDeleteSelected}
					/>
				</div>
			</main>
		</div>
	);
}

export default Home;
