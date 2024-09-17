import { api } from "@/lib/api";
import { BudgetRequest } from "@/models/budget-request";

export const fetchBudgetItems = async (): Promise<BudgetRequest[]> => {
  try {
    const response = await api.get<BudgetRequest[]>("/items");
    console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching budget items:", error);
    throw error;
  }
};

interface CreateBudgetItemRequest {
  title: string;
  quantity: number;
  amount: number;
  owner_id: number;
}

interface CreateBudgetItemResponse {
  data: BudgetRequest;
}

export const createBudgetItem = async (body: CreateBudgetItemRequest) => {
  try {
    const response = await api.post<CreateBudgetItemResponse>("/items", body);
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error creating budget item:", error);
    throw error;
  }
};

interface EditBudgetItemRequest {
  title?: string;
  quantity?: number;
  amount?: number;
  owner_id?: number;
}

interface EditBudgetItemResponse {
  data: BudgetRequest;
}

export const editBudgetItem = async (id: number, body: EditBudgetItemRequest) => {
  try {
    const response = await api.put<EditBudgetItemResponse>(`/items/${id}`, body);
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error(`Error editing budget item with ID ${id}:`, error);
    throw error;
  }
};

// Updated function to use PATCH for updating the status of a budget item
interface UpdateBudgetStatusRequest {
  status: string;
}

interface UpdateBudgetStatusResponse {
  data: BudgetRequest;
}

export const updateStatusBudget = async (id: number, body: UpdateBudgetStatusRequest) => {
  try {
    const response = await api.patch<UpdateBudgetStatusResponse>(`/items/${id}`, body);
    const { data } = response.data;
    return data;
  } catch (error) {
    console.error(`Error updating status for budget item with ID ${id}:`, error);
    throw error;
  }
};
