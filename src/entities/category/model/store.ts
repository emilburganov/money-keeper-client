import { categoryApi, ErrorsResponse } from "@/shared/api";
import { Category, CategoryBody } from "@/shared/api/category";
import { sendErrorNotification } from "@/shared/lib/helpers";
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

	public async getCategories() {
		try {
			const categoryResponse = await categoryApi.getCategories();

			runInAction(() => {
				this._categories = categoryResponse;
			});

			return categoryResponse;
		} catch (error) {
			console.error(error);
		}
	}

	async createCategory(body: CategoryBody) {
		try {
			const categoryResponse = await categoryApi.createCategory(body);

			if (categoryResponse) {
				this.categories = [...this.categories, categoryResponse];
			}

			return categoryResponse;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;

			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				const message: string = axiosError.response.data?.message;

				Object.values(errors).forEach(error => {
					sendErrorNotification(message, error);
				});
			}
		}
	}

	async updateCategory(body: CategoryBody, id: number) {
		try {
			const categoryResponse = await categoryApi.updateCategory(body, id);

			if (categoryResponse) {
				this.categories = this.categories.map(category =>
					category.id === id ? categoryResponse : category,
				);
			}

			return categoryResponse;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;

			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				const message: string = axiosError.response.data?.message;

				Object.values(errors).forEach(error => {
					sendErrorNotification(message, error);
				});
			}
		}
	}

	async deleteCategory({ id }: Category) {
		try {
			const categoryResponse = await categoryApi.deleteCategory(id);

			if (categoryResponse) {
				this.categories = this.categories.filter(
					category => category.id !== id,
				);
			}

			return categoryResponse;
		} catch (error) {
			console.error(error);
		}
	}
}
