import { ErrorsResponse, expenseApi } from "@/shared/api";
import { Expense, ExpenseBody, ExpensesStats } from "@/shared/api/expense";
import { sendErrorNotification } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class ExpenseStore {
	private _expenses = [] as Expense[];
	private _expensesStats = {} as ExpensesStats;

	get expenses(): Expense[] {
		return this._expenses;
	}

	set expenses(expenses: Expense[]) {
		this._expenses = expenses;
	}
	
	get expensesStats(): ExpensesStats {
		return this._expensesStats;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
		);
	}

	async getExpenses() {
		try {
			const expenseResponse = await expenseApi.getExpenses();

			runInAction(() => {
				this._expenses = expenseResponse;
			});

			return expenseResponse;
		} catch (error) {
			console.error(error);
		}
	}
	
	async getExpensesStats() {
		try {
			const expensesStatsResponse = await expenseApi.getExpensesStats();
			
			runInAction(() => {
				this._expensesStats = expensesStatsResponse;
			});
			
			return expensesStatsResponse;
		} catch (error) {
			console.error(error);
		}
	}

	async createExpense(body: ExpenseBody) {
		try {
			const expenseResponse = await expenseApi.createExpense(body);

			if (expenseResponse) {
				this.expenses = [...this.expenses, expenseResponse];
			}

			return expenseResponse;
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

	async updateExpense(body: ExpenseBody, id: number) {
		try {
			const expenseResponse = await expenseApi.updateExpense(body, id);

			if (expenseResponse) {
				this.expenses = this.expenses.map((expense) =>
					expense.id === id ? expenseResponse : expense,
				);
			}

			return expenseResponse;
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

	async deleteExpense({ id }: Expense) {
		try {
			const expenseResponse = await expenseApi.deleteExpense(id);

			if (expenseResponse) {
				this.expenses = this.expenses.filter((expense) => expense.id !== id);
			}

			return expenseResponse;
		} catch (error) {
			console.error(error);
		}
	}
}
