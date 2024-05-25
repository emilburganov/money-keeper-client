import {categoryApi, ErrorsResponse} from "@/shared/api";
import {CategoriesStats, CategoriesStatsBody, Category, CategoryBody} from "@/shared/api/category";
import {sendSuccessNotification, sendValidationErrors} from "@/shared/lib/helpers";
import {AxiosError} from "axios";
import {makeAutoObservable, runInAction} from "mobx";
import {t} from "i18next";

type PrivateFields = "_root";

export class CategoryStore {
    private _categories = [] as Category[];
    private _incomeCategoriesStats = {} as CategoriesStats;
    private _expenseCategoriesStats = {} as CategoriesStats;

    get categories(): Category[] {
        return this._categories;
    }

    set categories(categories: Category[]) {
        this._categories = categories;
    }

    get incomeCategoriesStats() {
        return this._incomeCategoriesStats;
    }

    get expenseCategoriesStats() {
        return this._expenseCategoriesStats;
    }

    constructor() {
        makeAutoObservable<this, PrivateFields>(
            this,
            {_root: false},
            {autoBind: true, deep: false},
        );
    }

    async getCategories() {
        try {
            const response = await categoryApi.getCategories();

            runInAction(() => {
                this._categories = response;
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async getIncomeCategoriesStats(body: CategoriesStatsBody|null = null) {
        try {
            const response = await categoryApi.getIncomeCategoriesStats(body);

            runInAction(() => {
                this._incomeCategoriesStats = response;
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async getExpenseCategoriesStats(body: CategoriesStatsBody | null = null) {
        try {
            const response = await categoryApi.getExpenseCategoriesStats(body);

            runInAction(() => {
                this._expenseCategoriesStats = response;
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async createCategory(body: CategoryBody) {
        try {
            const response = await categoryApi.createCategory(body);

            if (response) {
                this.categories = [...this.categories, response];

                sendSuccessNotification(
                    t("notifications.category.created.title"),
                );
            }

            return response;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            sendValidationErrors(axiosError);
        }
    }

    async updateCategory(body: Omit<CategoryBody, "type">, id: number) {
        try {
            const response = await categoryApi.updateCategory(body, id);

            if (response) {
                this.categories = this.categories.map(category =>
                    category.id === id ? response : category,
                );

                sendSuccessNotification(
                    t("notifications.category.updated.title"),
                );
            }

            return response;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorsResponse>;

            sendValidationErrors(axiosError);
        }
    }

    async deleteCategory({id}: Category) {
        try {
            const response = await categoryApi.deleteCategory(id);

            if (response) {
                this.categories = this.categories.filter(
                    category => category.id !== id,
                );

                sendSuccessNotification(
                    t("notifications.category.deleted.title"),
                );
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
