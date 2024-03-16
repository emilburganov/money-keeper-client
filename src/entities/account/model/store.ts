import { accountApi, ErrorsResponse } from "@/shared/api";
import { Account, AccountBody } from "@/shared/api/account";
import { sendErrorNotification } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class AccountStore {
	private _accounts = [] as Account[];

	get accounts(): Account[] {
		return this._accounts;
	}

	set accounts(accounts: Account[]) {
		this._accounts = accounts;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
		);
	}

	public async getAccounts() {
		try {
			const accountResponse = await accountApi.getAccounts();

			runInAction(() => {
				this._accounts = accountResponse;
			});

			return accountResponse;
		} catch (error) {
			console.error(error);
		}
	}

	async createAccount(body: AccountBody) {
		try {
			const accountResponse = await accountApi.createAccount(body);

			if (accountResponse) {
				this.accounts = [...this.accounts, accountResponse];
			}

			return accountResponse;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;
			
			const message: string = String(axiosError?.response?.data?.message);
			
			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				
				Object.values(errors).forEach(error => {
					sendErrorNotification(message, error);
				});
			}
			
			if (message) {
				sendErrorNotification(message);
			}
		}
	}

	async updateAccount(body: AccountBody, id: number) {
		try {
			const accountResponse = await accountApi.updateAccount(body, id);

			if (accountResponse) {
				this.accounts = this.accounts.map(account =>
					account.id === id ? accountResponse : account,
				);
			}

			return accountResponse;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;
			
			const message: string = String(axiosError?.response?.data?.message);
			
			if (axiosError.response?.data?.errors) {
				const errors: string[] = axiosError.response.data?.errors;
				
				Object.values(errors).forEach(error => {
					sendErrorNotification(message, error);
				});
			}
			
			if (message) {
				sendErrorNotification(message);
			}
		}
	}

	async deleteAccount({ id }: Account) {
		try {
			const accountResponse = await accountApi.deleteAccount(id);

			if (accountResponse) {
				this.accounts = this.accounts.filter(account => account.id !== id);
			}

			return accountResponse;
		} catch (error) {
			console.error(error);
		}
	}
}
