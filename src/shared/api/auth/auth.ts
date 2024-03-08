import { apiInstance } from "../base";
import { MessageResponse } from "../types";
import {
	LoginCredentials,
	RegistrationCredentials,
	TokenResponse,
	User,
} from "./models";

const BASE_URL = "/auth";

export const login = (
	credentials: LoginCredentials,
): Promise<TokenResponse> => {
	return apiInstance.post(`${BASE_URL}/login`, credentials);
};

export const registration = (
	credentials: RegistrationCredentials,
): Promise<TokenResponse> => {
	return apiInstance.post(`${BASE_URL}/registration`, credentials);
};

export const logout = (): Promise<MessageResponse> => {
	return apiInstance.post(`${BASE_URL}/logout`);
};

export const me = (): Promise<User> => {
	return apiInstance.post(`${BASE_URL}/me`);
};
