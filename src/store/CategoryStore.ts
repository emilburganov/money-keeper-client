import {notification} from "@/helpers/notification";
import {ICategory} from "@/models/ICategory";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import CategoryService from "@/services/CategoryService";
import RootStore from "@/store/RootStore";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

class CategoryStore {
    private rootStore: RootStore;
    categories: ICategory[] = [];

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setCategories(categories: ICategory[]) {
        this.categories = categories;
    }

    async index() {
        try {
            const response = await CategoryService.index(this.rootStore.authStore.user);
            this.setCategories(response.data);
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response || axiosError?.response.status === 500) {
                notification(
                    "Server error.",
                    "Server side error, try again another time.",
                    false,
                );
            }
        }
    }

    async destroy(category: ICategory) {
        try {
            await CategoryService.destroy(this.rootStore.authStore.user, category);
            this.setCategories(this.categories.filter(_category => _category.id !== category.id));
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (!axiosError.response || axiosError?.response.status === 500) {
                notification(
                    "Server error.",
                    "Server side error, try again another time.",
                    false,
                );
            }
        }
    }
}

export default CategoryStore;