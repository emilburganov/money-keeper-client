import {sendErrorNotification} from "@/helpers/sendErrorNotification";
import {sendSuccessNotification} from "@/helpers/sendSuccessNotification";
import {LoginCredentials} from "@/models/Credentials/LoginCredentials";
import {RegistrationCredentials} from "@/models/Credentials/RegistrationCredentials";
import {IUser} from "@/models/IUser";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import AuthService from "@/services/AuthService";
import {AxiosError} from "axios";
import {t} from "i18next";
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

            sendSuccessNotification(
                t("notifications.success.loginSuccess.title"),
                t("notifications.success.loginSuccess.description"),
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            if (axiosError.response) {
                if (axiosError.response.status === 401) {
                    sendErrorNotification(
                        t("notifications.error.authError.title"),
                        t("notifications.error.authError.description"),
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

            sendSuccessNotification(
                t("notifications.success.registerSuccess.title"),
                t("notifications.success.registerSuccess.description"),
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            if (axiosError.response?.data?.errors) {
                const errors: string[] = axiosError.response.data?.errors;
                const message: string = axiosError.response.data?.message;

                Object.values(errors).forEach((error) => {
                    sendErrorNotification(
                        message,
                        error,
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
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            sendErrorNotification(
                t("notifications.error.meError.title"),
                t("notifications.error.meError.description"),
            );
        }
    }
}

export default AuthStore;