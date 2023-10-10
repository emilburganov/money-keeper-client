import $api from "../http/index";
import {AxiosResponse} from "axios";
import {AuthResponse} from "@/models/response/AuthResponse";

export default class AuthService {
    static async login(credentials): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/login", {
            email: credentials.email,
            password: credentials.password,
        });
    }

    static async register(credentials): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("auth/register", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation,
        });
    }

    static async logout(): Promise<AxiosResponse> {
        return $api.post("auth/logout");
    }
}