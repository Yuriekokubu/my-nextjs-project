export interface BudgetRequest {
    id: number
    title: string
    quantity: number
    amount: number
    status: 'PENDING' | "APPROVED" | "REJECTED"
}
