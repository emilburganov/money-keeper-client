import {ICategory} from "@/models/ICategory";
import CategoryService from "@/services/CategoryService";
import RootStore from "@/store/RootStore";
import {createStandaloneToast} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {makeAutoObservable} from "mobx";

const {toast} = createStandaloneToast();

class CategoryStore {
    private rootStore: RootStore ;
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
            if (!(error instanceof AxiosError)) {
                throw error;
            }

            toast({
                title: "Error loading categories.",
                description: "Check your internet connection or try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    async destroy(category: ICategory) {
        try {
            await CategoryService.destroy(this.rootStore.authStore.user, category);
            this.setCategories(this.categories.filter(_category => _category.id !== category.id));
        } catch (error: unknown) {
            if (!(error instanceof AxiosError)) {
                throw error;
            }

            toast({
                title: "Error during deletion.",
                description: "Category does not exist.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
}

export default CategoryStore;