import { ErrorsResponse, incomeApi } from "@/shared/api";
import { Income, IncomeBody, IncomesStats } from "@/shared/api/income";
import { sendErrorNotification } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class IncomeStore {
	private _incomes = [] as Income[];
	private _incomesStats = {} as IncomesStats;

	get incomes(): Income[] {
		return this._incomes;
	}

	set incomes(incomes: Income[]) {
		this._incomes = incomes;
	}
	
	get incomesStats(): IncomesStats {
		return this._incomesStats;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
		);
	}

	async getIncomes() {
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
	
	async getIncomesStats() {
		try {
			const incomesStatsResponse = await incomeApi.getIncomesStats();
			
			runInAction(() => {
				this._incomesStats = incomesStatsResponse;
			});
			
			return incomesStatsResponse;
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
			
			const message: string = String(axiosError?.response?.data?.message);
			
			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				
				Object.values(errors).forEach((error) => {
					sendErrorNotification(message, error);
				});
			}
			
			if (message) {
				sendErrorNotification(message);
			}
		}
	}

	async updateIncome(body: IncomeBody, id: number) {
		try {
			const incomeResponse = await incomeApi.updateIncome(body, id);

			if (incomeResponse) {
				this.incomes = this.incomes.map((income) =>
					income.id === id ? incomeResponse : income,
				);
			}

			return incomeResponse;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;
			
			const message: string = String(axiosError?.response?.data?.message);
			
			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				
				Object.values(errors).forEach((error) => {
					sendErrorNotification(message, error);
				});
			}
			
			if (message) {
				sendErrorNotification(message);
			}
		}
	}

	async deleteIncome({ id }: Income) {
		try {
			const incomeResponse = await incomeApi.deleteIncome(id);

			if (incomeResponse) {
				this.incomes = this.incomes.filter((income) => income.id !== id);
			}

			return incomeResponse;
		} catch (error) {
			console.error(error);
		}
	}
}
