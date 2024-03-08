export interface User {
	id: number;
	name: string;
	email: string;
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
