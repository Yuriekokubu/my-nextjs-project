export interface BudgetRequest {
    id: number;
    title: string;
    amount: number;
    quantity: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    owner_id: number
    updated_at: string;
}