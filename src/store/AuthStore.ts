import {IUser} from "@/models/IUser";
import AuthService from "@/services/AuthService";
import {createStandaloneToast} from "@chakra-ui/react";
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

    async login(credentials) {
        try {
            const response = await AuthService.login(credentials);
            localStorage.setItem("token", response.data?.data?.access_token);
            this.setAuth(true);

            toast({
                title: "Successfully login.",
                description: "You have successfully login into your account.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } catch (error) {
            toast({
                title: "Authentication error.",
                description: error.response.data?.error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    async register(credentials) {
        try {
            const response = await AuthService.register(credentials);
            localStorage.setItem("token", response.data?.data?.access_token);
            this.setAuth(true);

            toast({
                title: "Successfully registered.",
                description: "You have successfully registered your account.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } catch (error) {
            const responseError = error.response.data?.error;

            if (responseError?.errors) {
                Object.values(responseError.errors).forEach((error) => {
                    toast({
                        title: "Authentication error.",
                        description: error[0],
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-left",
                    });
                });
            } else if (responseError.message) {
                toast({
                    title: "Authentication error.",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            this.setAuth(false);
        } catch (error) {
            toast({
                title: "Error.",
                description: "Something went wrong.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } finally {
            localStorage.removeItem("token");
        }
    }

    async me() {
        try {
            const response = await AuthService.me();
            this.setUser(response.data?.data);
        } catch (error) {
            toast({
                title: "Error.",
                description: "Something went wrong.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
}

export default AuthStore;