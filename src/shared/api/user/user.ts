import { apiInstance } from "../base";
import { Balance } from "./models";

export const getBalance = (currency: string): Promise<Balance> => {
	return apiInstance.get("/balance" , {
		params: {
			currency
		},
	});
};