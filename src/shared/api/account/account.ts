import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import { Account, AccountBody, AccountsStats } from "./models";

const BASE_URL = "/accounts";

export const getAccounts = (): Promise<Account[]> => {
	return apiInstance.get(BASE_URL);
};

export const getAccountsSummaryStats = (): Promise<AccountsStats> => {
	return apiInstance.get(`${BASE_URL}/stats`);
};


export const createAccount = (body: AccountBody): Promise<Account> => {
	return apiInstance.post(`${BASE_URL}`, body);
};

export const updateAccount = (
	body: AccountBody,
	id: number,
): Promise<Account> => {
	return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteAccount = (id: number): Promise<MessageResponse> => {
	return apiInstance.delete(`${BASE_URL}/${id}`);
};
