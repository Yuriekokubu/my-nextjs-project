"use client";

import { createContext, useState, ReactNode, useContext, useCallback, useEffect } from "react";
import { fetchBudgetItems } from "@/services/budget-item";
import { BudgetRequest } from "@/models/budget-request";

interface BudgetContextType {
	budgetRequests: BudgetRequest[];
	setBudgetRequests: React.Dispatch<React.SetStateAction<BudgetRequest[]>>;
	refreshBudgetRequests: () => void; // Function to refresh the data
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
	const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);

	// Fetch budget items and update the state
	const fetchAndUpdateBudgetRequests = useCallback(async () => {
		try {
			const items = await fetchBudgetItems();
			setBudgetRequests(items);
		} catch (error) {
			console.error("Error fetching budget requests:", error);
		}
	}, []); // useCallback ensures this function is only created once

	// Fetch data when the provider mounts
	useEffect(() => {
		fetchAndUpdateBudgetRequests();
	}, [fetchAndUpdateBudgetRequests]); // Depend on the memoized function

	// Function to refresh the data
	const refreshBudgetRequests = useCallback(() => {
		fetchAndUpdateBudgetRequests();
	}, [fetchAndUpdateBudgetRequests]);

	const value = { budgetRequests, setBudgetRequests, refreshBudgetRequests };

	return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}

export const useBudget = (): BudgetContextType => {
	const context = useContext(BudgetContext);
	if (context === undefined) {
		throw new Error("useBudget must be used within a BudgetProvider");
	}
	return context;
};
