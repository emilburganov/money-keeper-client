import { ErrorsResponse, transferApi } from "@/shared/api";
import { Transfer, TransferBody, TransfersStats } from "@/shared/api/transfer";
import { sendErrorNotification } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

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
            {_root: false},
            {autoBind: true, deep: false},
        );
    }
    
    async getTransfers() {
        try {
            const transferResponse = await transferApi.getTransfers();
            
            runInAction(() => {
                this._transfers = transferResponse;
            });
            
            return transferResponse;
        } catch (error) {
            console.error(error);
        }
    }
    
    async getTransfersStats() {
        try {
            const transfersStatsResponse = await transferApi.getTransfersStats();
            
            runInAction(() => {
                this._transfersStats = transfersStatsResponse;
            });
            
            return transfersStatsResponse;
        } catch (error) {
            console.error(error);
        }
    }
    
    async createTransfer(body: TransferBody) {
        try {
            const transferResponse = await transferApi.createTransfer(body);
            
            if (transferResponse) {
                this.transfers = [...this.transfers, transferResponse];
            }
            
            return transferResponse;
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
    
    async updateTransfer(body: TransferBody, id: number) {
        try {
            const transferResponse = await transferApi.updateTransfer(body, id);
            
            if (transferResponse) {
                this.transfers = this.transfers.map((transfer) =>
                    transfer.id === id ? transferResponse : transfer,
                );
            }
            
            return transferResponse;
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
    
    async deleteTransfer({id}: Transfer) {
        try {
            const transferResponse = await transferApi.deleteTransfer(id);
            
            if (transferResponse) {
                this.transfers = this.transfers.filter((transfer) => transfer.id !== id);
            }
            
            return transferResponse;
        } catch (error) {
            console.error(error);
        }
    }
}
