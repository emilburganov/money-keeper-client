import {MessageResponse} from "@/models/response/MessageResponse";
import {TokenResponse} from "@/models/response/TokenResponse";
import {UserResponse} from "@/models/response/UserResponse";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class AuthService {
    static async login(credentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("auth/login", {
            email: credentials.email,
            password: credentials.password,
        });
    }

    static async register(credentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("auth/register", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation,
        });
    }

    static async logout(): Promise<AxiosResponse<MessageResponse>> {
        return $api.post("auth/logout");
    }

    static async me(): Promise<AxiosResponse<UserResponse>> {
        return $api.post("auth/me");
    }
}