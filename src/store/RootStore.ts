import {makeAutoObservable} from "mobx";
import {IUser} from "@/models/IUser";
import AuthService from "@/services/AuthService";

class RootStore {
    user = {} as IUser;
    isAuth = !!localStorage.getItem("token");
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(credentials) {
        try {
            const response = await AuthService.login(credentials);
            console.log(response);
            localStorage.setItem("token", response.data.data.access_token);
            this.setAuth(true);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async register(credentials) {
        try {
            const response = await AuthService.register(credentials);
            localStorage.setItem("token", response.data.data.access_token);
            this.setAuth(true);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}

export default RootStore;