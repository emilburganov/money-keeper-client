import { categoryApi, ErrorsResponse } from "@/shared/api";
import { Category, CategoryBody } from "@/shared/api/category";
import { sendValidationErrors } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class CategoryStore {
	private _categories = [] as Category[];

	get categories(): Category[] {
		return this._categories;
	}

	set categories(categories: Category[]) {
		this._categories = categories;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
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

	async createCategory(body: CategoryBody) {
		try {
			const response = await categoryApi.createCategory(body);

			if (response) {
				this.categories = [...this.categories, response];
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
			}

			return response;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;

			sendValidationErrors(axiosError);
		}
	}

	async deleteCategory({ id }: Category) {
		try {
			const response = await categoryApi.deleteCategory(id);

			if (response) {
				this.categories = this.categories.filter(
					category => category.id !== id,
				);
			}

			return response;
		} catch (error) {
			console.error(error);
		}
	}
}
