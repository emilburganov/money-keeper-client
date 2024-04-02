import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import { Income, IncomeBody, IncomesStats } from "./models";

const BASE_URL = "/incomes";

export const getIncomes = (): Promise<Income[]> => {
    return apiInstance.get(BASE_URL);
};

export const getIncomesStats = (): Promise<IncomesStats> => {
    return apiInstance.get(`${BASE_URL}/stats`);
};

export const createIncome = (body: IncomeBody): Promise<Income> => {
    return apiInstance.post(`${BASE_URL}`, body);
};

export const updateIncome = (body: IncomeBody, id: number): Promise<Income> => {
    return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteIncome = (id: number): Promise<MessageResponse> => {
    return apiInstance.delete(`${BASE_URL}/${id}`);
};
