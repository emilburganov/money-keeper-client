import {ICategory} from "@/models/ICategory";
import CategoryService from "@/services/CategoryService";
import {createStandaloneToast} from "@chakra-ui/react";
import {makeAutoObservable} from "mobx";

const {toast} = createStandaloneToast();

class CategoryStore {
    private rootStore;
    categories = [] as ICategory;

    constructor(rootStore) {
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
        } catch (error) {
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
            this.setCategories((prevState: ICategory[]) => {
                prevState.filter(_category => _category.id !== category.id)
            });
        } catch (error) {
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