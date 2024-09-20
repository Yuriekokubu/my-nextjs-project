import { BudgetRequest } from "@/models/budget-request";

export interface CreateBudgetItemRequest {
    title: string;
    quantity: number;
    amount: number;
    owner_id: number;
}

export interface CreateBudgetItemResponse {
    data: BudgetRequest;
}

export interface EditBudgetItemRequest {
    title?: string;
    quantity?: number;
    amount?: number;
    owner_id?: number;
}

export interface EditBudgetItemResponse {
    data: BudgetRequest;
}

export interface UpdateBudgetStatusRequest {
    status: string;
}

export interface UpdateBudgetStatusResponse {
    data: BudgetRequest;
}


