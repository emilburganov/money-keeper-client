import {API_URL} from "@/constants";
import {TokenResponse} from "@/models/response/TokenResponse";
import axios from "axios";

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

    if (error.response.status == 401 && error.config && !error.config._isRetry && localStorage.getItem("token")) {
        originalRequest._isRetry = true;

        const response = await axios.post<TokenResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
            token: localStorage.getItem("token"),
        });

        localStorage.setItem("token", response.data.access_token);

        return $api.request(originalRequest);
    }

    throw error;
});

export default $api;