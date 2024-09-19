"use client";

import { createContext, useState, ReactNode, useContext, useCallback, useEffect } from "react";
import { fetchBudgetItems } from "@/services/budget-item";
import { BudgetRequest } from "@/models/budget-request";

interface BudgetContextType {
	budgetRequests: BudgetRequest[];
	setBudgetRequests: React.Dispatch<React.SetStateAction<BudgetRequest[]>>;
	refreshBudgetRequests: () => void; 
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
	const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);

	const fetchAndUpdateBudgetRequests = useCallback(async () => {
		try {
			const items = await fetchBudgetItems();
			setBudgetRequests(items);
		} catch (error) {
			console.error("Error fetching budget requests:", error);
		}
	}, []); 

	useEffect(() => {
		fetchAndUpdateBudgetRequests();
	}, [fetchAndUpdateBudgetRequests]); 

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
