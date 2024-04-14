import { API_URL } from "@/shared/config";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TokenResponse } from "../api/auth";

class ApiInstance {
	private axios: AxiosInstance;

	constructor() {
		this.axios = axios.create({
			baseURL: API_URL,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				Lang: localStorage.getItem("lang"),
			},
		});

		this.axios.interceptors.response.use(
			config => {
				return config;
			},
			async error => {
				const originalRequest = error.config;

				if (
					error.response.status === 401 &&
					!error.config._isRetry &&
					localStorage.getItem("token")
				) {
					originalRequest._isRetry = true;

					try {
						const response = await axios.post<TokenResponse>(
							`${API_URL}/auth/refresh`,
							{
								withCredentials: true,
								token: localStorage.getItem("token"),
							},
						);

						localStorage.setItem("token", response.data.access_token);

						return this.axios.request(originalRequest);
					} catch {
						localStorage.removeItem("token");
					}
				}

				throw error;
			},
		);

		this.axios.interceptors.request.use(
			config => {
				const token = localStorage.getItem("token");
				const lang = localStorage.getItem("lang");

				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				if (lang) {
					config.headers.Lang = localStorage.getItem("lang");
				}

				return config;
			},
			error => {
				return Promise.reject(error);
			},
		);
	}

	async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
		const response: AxiosResponse<T> = await this.axios.get(endpoint, options);

		return response.data;
	}

	async post<T>(
		endpoint: string,
		data?: unknown,
		options: AxiosRequestConfig = {},
	): Promise<T> {
		const response: AxiosResponse<T> = await this.axios.post(
			endpoint,
			data,
			options,
		);

		return response.data;
	}

	async patch<T>(
		endpoint: string,
		data?: unknown,
		options: AxiosRequestConfig = {},
	): Promise<T> {
		const response: AxiosResponse<T> = await this.axios.patch(
			endpoint,
			data,
			options,
		);

		return response.data;
	}

	async delete<T>(
		endpoint: string,
		options: AxiosRequestConfig = {},
	): Promise<T> {
		const response: AxiosResponse<T> = await this.axios.delete(
			endpoint,
			options,
		);

		return response.data;
	}
}

export const apiInstance = new ApiInstance();
