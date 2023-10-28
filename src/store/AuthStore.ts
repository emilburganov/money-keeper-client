import {LoginCredentials} from "@/models/Credentials/LoginCredentials";
import {RegistrationCredentials} from "@/models/Credentials/RegistrationCredentials";
import {IUser} from "@/models/IUser";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import AuthService from "@/services/AuthService";
import {createStandaloneToast} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

const {toast} = createStandaloneToast();

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

            toast({
                title: "Successful login.",
                description: "You have successful login into your account.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

            return response;
        } catch (error: unknown) {
            if (!(error instanceof AxiosError)) {
                throw error;
            }

            if (!error.response) {
                return toast({
                    title: "Network error.",
                    description: "Check your internet connection and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }

            if (error.response.status === 500) {
                return toast({
                    title: "Server error.",
                    description: "Server side error, try again another time.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }

            toast({
                title: "Authentication error.",
                description: error.response.data?.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    async registration(credentials: RegistrationCredentials) {
        try {
            const response = await AuthService.registration(credentials);
            localStorage.setItem("token", response.data?.access_token);
            this.setAuth(true);

            toast({
                title: "Successful registered.",
                description: "You have successful registered your account.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

            return response;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response) {
                return toast({
                    title: "Network error.",
                    description: "Check your internet connection and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }

            if (axiosError.response.status === 500) {
                return toast({
                    title: "Server error.",
                    description: "Server side error, try again another time.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }

            const errors = axiosError.response.data?.errors;
            const message = axiosError.response.data?.message;

            Object.values(errors).forEach((error: string[]): void => {
                toast({
                    title: message,
                    description: error[0],
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            });
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
            if (!(error instanceof AxiosError)) {
                throw error;
            }

            if (!error.response) {
                return toast({
                    title: "Network error.",
                    description: "Check your internet connection and try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }
        }
    }
}

export default AuthStore;