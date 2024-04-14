import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import { Transfer, TransferBody, TransfersStats } from "./models";

const BASE_URL = "/transfers";

export const getTransfers = (): Promise<Transfer[]> => {
	return apiInstance.get(BASE_URL);
};

export const getTransfersStats = (): Promise<TransfersStats> => {
	return apiInstance.get(`${BASE_URL}/stats`);
};

export const createTransfer = (body: TransferBody): Promise<Transfer> => {
	return apiInstance.post(`${BASE_URL}`, body);
};

export const updateTransfer = (
	body: TransferBody,
	id: number,
): Promise<Transfer> => {
	return apiInstance.patch(`${BASE_URL}/${id}`, body);
};

export const deleteTransfer = (id: number): Promise<MessageResponse> => {
	return apiInstance.delete(`${BASE_URL}/${id}`);
};
