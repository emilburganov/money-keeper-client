import { ErrorsResponse, incomeApi } from "@/shared/api";
import { Income, IncomeBody, IncomesStats } from "@/shared/api/income";
import {sendSuccessNotification, sendValidationErrors} from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import {t} from "i18next";

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
      const response = await incomeApi.getIncomes();

      runInAction(() => {
        this._incomes = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getIncomesStats() {
    try {
      const response = await incomeApi.getIncomesStats();

      runInAction(() => {
        this._incomesStats = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createIncome(body: IncomeBody) {
    try {
      const response = await incomeApi.createIncome(body);

      if (response) {
        this.incomes = [...this.incomes, response];

        sendSuccessNotification(
            t("notifications.income.created.title"),
        )
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async updateIncome(body: IncomeBody, id: number) {
    try {
      const response = await incomeApi.updateIncome(body, id);

      if (response) {
        this.incomes = this.incomes.map(income =>
          income.id === id ? response : income,
        );

        sendSuccessNotification(
            t("notifications.income.updated.title"),
        )
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async deleteIncome({ id }: Income) {
    try {
      const response = await incomeApi.deleteIncome(id);

      if (response) {
        this.incomes = this.incomes.filter(income => income.id !== id);

        sendSuccessNotification(
            t("notifications.income.deleted.title"),
        )
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
