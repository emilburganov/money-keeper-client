import {API_URL} from "@/constants";
import {sendNotification} from "@/helpers/sendNotification";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import {TokenResponse} from "@/models/Response/TokenResponse";
import axios, {AxiosError} from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    const axiosError = error as AxiosError<ErrorsResponse>;

    if (!axiosError.response || axiosError.response.status === 500) {
        sendNotification(
            "Server error.",
            "Server side error, try again another time.",
            false,
        );
    }

    if (error.response.status === 401 && error.config && !error.config._isRetry && localStorage.getItem("token")) {
        originalRequest._isRetry = true;

        try {
            const response = await axios.post<TokenResponse>(`${API_URL}/auth/refresh`, {
                withCredentials: true,
                token: localStorage.getItem("token"),
            });

            localStorage.setItem("token", response.data.access_token);

            return $api.request(originalRequest);
        } catch {
            localStorage.removeItem("token");
        }
    }

    throw error;
});

export default $api;