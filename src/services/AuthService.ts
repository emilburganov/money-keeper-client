import {MessageResponse} from "@/models/Response/MessageResponse";
import {TokenResponse} from "@/models/Response/TokenResponse";
import {UserResponse} from "@/models/Response/UserResponse";
import {AxiosResponse} from "axios";
import $api from "../http/index";

export default class AuthService {
    static async login(credentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("auth/login", {
            email: credentials.email,
            password: credentials.password,
        });
    }

    static async registration(credentials): Promise<AxiosResponse<TokenResponse>> {
        return $api.post<TokenResponse>("auth/registration", {
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