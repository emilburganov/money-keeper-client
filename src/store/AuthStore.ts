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
        } catch (error) {
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

    async registration(credentials) {
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
        } catch (error) {
            const errors = error.response.data?.errors;
            const message = error.response.data?.message;

            Object.values(errors).forEach((error) => {
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
        await AuthService.logout();
        this.setAuth(false);

        localStorage.removeItem("token");
    }

    async me() {
        try {
            const response = await AuthService.me();
            this.setUser(response.data);
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