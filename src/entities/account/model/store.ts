import { accountApi, ErrorsResponse } from "@/shared/api";
import { Account, AccountBody, AccountsStats } from "@/shared/api/account";
import { sendValidationErrors } from "@/shared/lib/helpers";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class AccountStore {
	private _accounts = [] as Account[];
	private _accountsSummaryStats = {} as AccountsStats;

	get accounts(): Account[] {
		return this._accounts;
	}

	set accounts(accounts: Account[]) {
		this._accounts = accounts;
	}

	get accountsSummaryStats() {
		return this._accountsSummaryStats;
	}

	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{ _root: false },
			{ autoBind: true, deep: false },
		);
	}

	async getAccounts() {
		try {
			const response = await accountApi.getAccounts();

			runInAction(() => {
				this._accounts = response;
			});

			return response;
		} catch (error) {
			console.error(error);
		}
	}

	async getAccountsStats() {
		try {
			const response = await accountApi.getAccountsStats();

			runInAction(() => {
				this._accountsSummaryStats = response;
			});

			return response;
		} catch (error) {
			console.error(error);
		}
	}

	async createAccount(body: AccountBody) {
		try {
			const response = await accountApi.createAccount(body);

			if (response) {
				this.accounts = [...this.accounts, response];
			}

			return response;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;

			sendValidationErrors(axiosError);
		}
	}

	async updateAccount(body: AccountBody, id: number) {
		try {
			const response = await accountApi.updateAccount(body, id);

			if (response) {
				this.accounts = this.accounts.map(account =>
					account.id === id ? response : account,
				);
			}

			return response;
		} catch (error) {
			const axiosError = error as AxiosError<ErrorsResponse>;

			sendValidationErrors(axiosError);
		}
	}

	async deleteAccount({ id }: Account) {
		try {
			const response = await accountApi.deleteAccount(id);

			if (response) {
				this.accounts = this.accounts.filter(account => account.id !== id);
			}

			return response;
		} catch (error) {
			console.error(error);
		}
	}
}
