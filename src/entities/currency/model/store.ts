import { currencyApi } from "@/shared/api";
import { Currency } from "@/shared/api/currency";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class CurrencyStore {
  private _currencies = [] as Currency[];

  get currencies(): Currency[] {
    return this._currencies;
  }

  constructor() {
    makeAutoObservable<this, PrivateFields>(
      this,
      { _root: false },
      { autoBind: true, deep: false },
    );
  }

  async getCurrencies() {
    try {
      const response = await currencyApi.getCurrencies();

      runInAction(() => {
        this._currencies = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
