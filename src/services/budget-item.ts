import { api } from "@/lib/api";
import { BudgetRequest } from "@/models/budget-request";
import { CreateBudgetItemRequest, CreateBudgetItemResponse, EditBudgetItemRequest, EditBudgetItemResponse, UpdateBudgetStatusRequest, UpdateBudgetStatusResponse } from "@/models/budget-item";


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

export const deleteBudgetItems = async (ids: number[]) => {
  try {
    const response = await api.delete('/items/delete', {
      data: { ids }, // Pass the IDs in the request body
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Failed to delete budget items:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
