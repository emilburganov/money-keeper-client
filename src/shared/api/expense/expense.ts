import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import { Expense, ExpenseBody } from "./models";

const BASE_URL = "/expenses";

export const getExpenses = (): Promise<Expense[]> => {
	return apiInstance.get(BASE_URL);
};

export const createExpense = (body: ExpenseBody): Promise<Expense> => {
	return apiInstance.post(`${BASE_URL}`, body);
};

export const updateExpense = (
	body: ExpenseBody,
	id: number,
): Promise<Expense> => {
	return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteExpense = (id: number): Promise<MessageResponse> => {
	return apiInstance.delete(`${BASE_URL}/${id}`);
};
