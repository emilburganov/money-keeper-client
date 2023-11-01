import {sendNotification} from "@/helpers/sendNotification";
import {ICategory} from "@/models/ICategory";
import CategoryService from "@/services/CategoryService";
import RootStore from "@/store/RootStore";
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
        } catch {
            sendNotification(
                "Index error.",
                "Error when getting a categories.",
                false,
            );
        }
    }

    async destroy(category: ICategory) {
        try {
            const {id} = category;
            await CategoryService.destroy(this.rootStore.authStore.user, category);
            this.setCategories(this.categories.filter((category) => category.id !== id));
        } catch {
            sendNotification(
                "Destroy error.",
                "Error when destroying a category.",
                false,
            );
        }
    }
}

export default CategoryStore;