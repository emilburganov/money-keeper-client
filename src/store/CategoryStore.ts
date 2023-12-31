import {sendErrorNotification} from "@/helpers/sendErrorNotification";
import {ICategory} from "@/models/ICategory";
import {ErrorsResponse} from "@/models/Response/ErrorsResponse";
import CategoryService from "@/services/CategoryService";
import RootStore from "@/store/RootStore";
import {AxiosError} from "axios";
import {t} from "i18next";
import {makeAutoObservable} from "mobx";

class CategoryStore {
    private rootStore: RootStore;
    categories = [] as ICategory[];

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

            if (axiosError.message == "Network Error") {
                return;
            }

            sendErrorNotification(
                t("notifications.error.indexError.title"),
                t("notifications.error.indexError.description"),
            );
        }
    }

    async destroy(category: ICategory) {
        try {
            const {id} = category;
            await CategoryService.destroy(this.rootStore.authStore.user, category);
            this.setCategories(this.categories.filter((category) => category.id !== id));
        } catch (error: unknown) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            if (axiosError.message == "Network Error") {
                return;
            }

            sendErrorNotification(
                t("notifications.error.destroyError.title"),
                t("notifications.error.destroyError.description"),
            );
        }
    }
}

export default CategoryStore;