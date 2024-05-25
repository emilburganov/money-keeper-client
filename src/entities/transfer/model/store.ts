import { ErrorsResponse, transferApi } from "@/shared/api";
import { Transfer, TransferBody, TransfersStats } from "@/shared/api/transfer";
import {sendSuccessNotification, sendValidationErrors} from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import {t} from "i18next";

type PrivateFields = "_root";

export class TransferStore {
  private _transfers = [] as Transfer[];
  private _transfersStats = {} as TransfersStats;

  get transfers(): Transfer[] {
    return this._transfers;
  }

  set transfers(incomes: Transfer[]) {
    this._transfers = incomes;
  }

  get transfersStats(): TransfersStats {
    return this._transfersStats;
  }

  constructor() {
    makeAutoObservable<this, PrivateFields>(
      this,
      { _root: false },
      { autoBind: true, deep: false },
    );
  }

  async getTransfers() {
    try {
      const response = await transferApi.getTransfers();

      runInAction(() => {
        this._transfers = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getTransfersStats() {
    try {
      const response = await transferApi.getTransfersStats();

      runInAction(() => {
        this._transfersStats = response;
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async createTransfer(body: TransferBody) {
    try {
      const response = await transferApi.createTransfer(body);

      if (response) {
        this.transfers = [...this.transfers, response];

        sendSuccessNotification(
            t("notifications.transfer.created.title"),
        )
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async updateTransfer(body: TransferBody, id: number) {
    try {
      const response = await transferApi.updateTransfer(body, id);

      if (response) {
        this.transfers = this.transfers.map(transfer =>
          transfer.id === id ? response : transfer,
        );

        sendSuccessNotification(
            t("notifications.transfer.updated.title"),
        )
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorsResponse>;

      sendValidationErrors(axiosError);
    }
  }

  async deleteTransfer({ id }: Transfer) {
    try {
      const response = await transferApi.deleteTransfer(id);

      if (response) {
        this.transfers = this.transfers.filter(transfer => transfer.id !== id);

        sendSuccessNotification(
            t("notifications.transfer.deleted.title"),
        )
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
