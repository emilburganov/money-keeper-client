import {notification} from "@/helpers/notification";
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

            notification(
                "Successful login.",
                "You have successful login into your account.",
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response || axiosError.response.status === 500) {
                notification(
                    "Server error.",
                    "Server side error, try again another time.",
                    false,
                );
            } else if (axiosError.response.status === 401) {
                notification(
                    "Authentication error.",
                    axiosError.response.data?.message,
                    false,
                );
            }
        }
    }

    async registration(credentials: RegistrationCredentials) {
        try {
            const response = await AuthService.registration(credentials);
            localStorage.setItem("token", response.data?.access_token);
            this.setAuth(true);

            notification(
                "Successful registered.",
                "You have successful registered your account.",
            );

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response || axiosError?.response.status === 500) {
                notification(
                    "Server error.",
                    "Server side error, try again another time.",
                    false,
                );
            } else if (axiosError.response?.data?.errors) {
                const errors: string[] = axiosError.response.data?.errors;
                const message: string = axiosError.response.data?.message;

                Object.values(errors).forEach((error) => {
                    notification(
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
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response || axiosError.response.status === 500) {
                notification(
                    "Server error.",
                    "Server side error, try again another time.",
                    false,
                );
            }
        }
    }
}

export default AuthStore;