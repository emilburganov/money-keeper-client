import { Currency } from "../currency";

export interface User {
	id: number;
	name: string;
	email: string;
	avatar: string;
	total: number;
	incomes: number;
	expenses: number;
	currency: Currency;
	created_at: string;
}

export interface UpdateUserCredentials {
	name: string;
	email: string;
	currency_id: number;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegistrationCredentials {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}
