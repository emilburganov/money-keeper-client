import { authApi } from "@/shared/api";
import { LoginCredentials, RegistrationCredentials, UpdateUserCredentials, User, } from "@/shared/api/auth";
import { ErrorsResponse } from "@/shared/api/types";
import { sendErrorNotification, sendSuccessNotification, } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { t } from "i18next";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class AuthStore {
    private _user = {} as User;
    private _isAuth = !!localStorage.getItem("token");
    
    get isAuth(): boolean {
        return this._isAuth;
    }
    
    set isAuth(bool: boolean) {
        this._isAuth = bool;
    }
    
    get user(): User {
        return this._user;
    }
    
    set user(user: User) {
        this._user = user;
    }
    
    constructor() {
        makeAutoObservable<this, PrivateFields>(
            this,
            {_root: false},
            {autoBind: true, deep: false},
        );
        
        (async () => {
            await this.init();
        })();
    }
    
    async load() {
        try {
            const response = await authApi.me();
            
            runInAction(() => {
                this.user = response;
                this.isAuth = true;
            });
            
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    
    async login(credentials: LoginCredentials) {
        try {
            const response = await authApi.login(credentials);
            
            runInAction(() => {
                localStorage.setItem("token", response.access_token);
                this.isAuth = true;
                
                sendSuccessNotification(
                    t("notifications.success.loginSuccess.title"),
                    t("notifications.success.loginSuccess.description"),
                );
            });
            
            return response;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            if (axiosError.response?.status === 401) {
                sendErrorNotification(
                    t("notifications.error.authError.title"),
                    t("notifications.error.authError.description"),
                );
            }
        }
    }
    
    async registration(credentials: RegistrationCredentials) {
        try {
            const response = await authApi.registration(credentials);
            
            runInAction(() => {
                localStorage.setItem("token", response.access_token);
                this.isAuth = true;
                
                sendSuccessNotification(
                    t("notifications.success.registrationSuccess.title"),
                    t("notifications.success.registrationSuccess.description"),
                );
            });
            
            return response;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            const message: string = String(axiosError?.response?.data?.message);
            
            if (axiosError.response?.data?.errors) {
                const errors: string[] = axiosError.response.data?.errors;
                
                Object.values(errors).forEach(error => {
                    sendErrorNotification(message, error);
                });
            }
            
            if (message) {
                sendErrorNotification(message);
            }
        }
    }
    
    async logout() {
        try {
            const response = await authApi.logout();
            
            runInAction(() => {
                localStorage.removeItem("token");
                this.isAuth = false;
            });
            
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    
    async updateUser(credentials: UpdateUserCredentials | FormData) {
        try {
            const response = await authApi.updateUser(credentials);
            
            runInAction(() => {
                this.user = response;
            });
            
            return response;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorsResponse>;
            
            const message: string = String(axiosError?.response?.data?.message);
            
            if (axiosError.response?.data?.errors) {
                const errors: string[] = axiosError.response.data?.errors;
                
                Object.values(errors).forEach((error) => {
                    sendErrorNotification(message, error);
                });
            }
            
            if (message) {
                sendErrorNotification(message);
            }
        }
    }
    
    async init() {
        if (this.isAuth) {
            await this.load();
        }
    }
}
