import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import { Transfer, TransferBody } from "./models";

const BASE_URL = "/transfers";

export const getTransfers = (): Promise<Transfer[]> => {
	return apiInstance.get(BASE_URL);
};

export const createTransfer = (body: TransferBody): Promise<Transfer> => {
	return apiInstance.post(`${BASE_URL}`, body);
};

export const updateTransfer = (body: TransferBody, id: number): Promise<Transfer> => {
	return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteTransfer = (id: number): Promise<MessageResponse> => {
	return apiInstance.delete(`${BASE_URL}/${id}`);
};
