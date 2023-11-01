import {sendNotification} from "@/helpers/sendNotification";
import {LoginCredentials} from "@/models/Credentials/LoginCredentials";
import {RegistrationCredentials} from "@/models/Credentials/RegistrationCredentials";
import {IUser} from "@/models/IUser";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import AuthService from "@/services/AuthService";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class AuthStore {
    isAuth = !!localStorage.getItem("token");
    user = {} as IUser;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    async login(credentials: LoginCredentials) {
        try {
            const response = await AuthService.login(credentials);
            localStorage.setItem("token", response.data.access_token);
            this.setAuth(true);

            sendNotification(
                "Successful login.",
                "You have successful login into your account.",
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.response) {
                const message: string = axiosError.response.data?.message;

                if (axiosError.response.status === 401) {
                    sendNotification(
                        "Authentication error.",
                        message,
                        false,
                    );
                }
            }
        }
    }

    async registration(credentials: RegistrationCredentials) {
        try {
            const response = await AuthService.registration(credentials);
            localStorage.setItem("token", response.data?.access_token);
            this.setAuth(true);

            sendNotification(
                "Successful registered.",
                "You have successful registered your account.",
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.response?.data?.errors) {
                const errors: string[] = axiosError.response.data?.errors;
                const message: string = axiosError.response.data?.message;

                Object.values(errors).forEach((error) => {
                    sendNotification(
                        message,
                        error,
                        false,
                    );
                });
            }
        }
    }

    async logout() {
        try {
            await AuthService.logout();
        } finally {
            this.setAuth(false);
            localStorage.removeItem("token");
        }
    }

    async me() {
        try {
            const response = await AuthService.me();
            this.setUser(response.data);
        } catch (error: unknown) {
            sendNotification(
                "Authentication error.",
                "Error while retrieving user information",
                false,
            );
        }
    }

    async update() {
        try {
            await AuthService.update(this.user);
        } catch {
            sendNotification(
                "Update error.",
                "Error when updating a user.",
                false,
            );
        }
    }
}

export default AuthStore;