import { apiInstance } from "../base";
import { Currency } from "./models";

const BASE_URL = "/currencies";

export const getCurrencies = (): Promise<Currency[]> => {
  return apiInstance.get(BASE_URL);
};
