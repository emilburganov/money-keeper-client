import { ErrorsResponse, incomeApi } from "@/shared/api";
import { Income, IncomeBody } from "@/shared/api/income";
import { sendErrorNotification } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class IncomeStore {
	private _incomes = [] as Income[];

	get incomes(): Income[] {
		return this._incomes;
	}

	set incomes(incomes: Income[]) {
		this._incomes = incomes;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
		);
	}

	public async getIncomes() {
		try {
			const incomeResponse = await incomeApi.getIncomes();

			runInAction(() => {
				this._incomes = incomeResponse;
			});

			return incomeResponse;
		} catch (error) {
			console.error(error);
		}
	}

	async createIncome(body: IncomeBody) {
		try {
			const incomeResponse = await incomeApi.createIncome(body);

			if (incomeResponse) {
				this.incomes = [...this.incomes, incomeResponse];
			}

			return incomeResponse;
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

	async updateIncome(body: IncomeBody, id: number) {
		try {
			const incomeResponse = await incomeApi.updateIncome(body, id);

			if (incomeResponse) {
				this.incomes = this.incomes.map(income =>
					income.id === id ? incomeResponse : income,
				);
			}

			return incomeResponse;
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

	async deleteIncome({ id }: Income) {
		try {
			const incomeResponse = await incomeApi.deleteIncome(id);

			if (incomeResponse) {
				this.incomes = this.incomes.filter(income => income.id !== id);
			}

			return incomeResponse;
		} catch (error) {
			console.error(error);
		}
	}
}
