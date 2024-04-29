import { ErrorsResponse, expenseApi } from "@/shared/api";
import { Expense, ExpenseBody, ExpensesStats } from "@/shared/api/expense";
import { sendValidationErrors } from "@/shared/lib/helpers";
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
      const response = await expenseApi.getExpenses();

      runInAction(() => {
        this._expenses = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getExpensesStats() {
    try {
      const response = await expenseApi.getExpensesStats();

      runInAction(() => {
        this._expensesStats = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createExpense(body: ExpenseBody) {
    try {
      const response = await expenseApi.createExpense(body);

      if (response) {
        this.expenses = [...this.expenses, response];
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async updateExpense(body: ExpenseBody, id: number) {
    try {
      const response = await expenseApi.updateExpense(body, id);

      if (response) {
        this.expenses = this.expenses.map(expense =>
          expense.id === id ? response : expense,
        );
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async deleteExpense({ id }: Expense) {
    try {
      const response = await expenseApi.deleteExpense(id);

      if (response) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
