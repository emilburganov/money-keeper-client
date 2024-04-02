import { userApi } from "@/shared/api";
import { Balance } from "@/shared/api/user";
import { makeAutoObservable, runInAction } from "mobx";

type PrivateFields = "_root";

export class UserStore {
	private _balance = {} as Balance;
	
	get balance(): Balance {
		return this._balance;
	}
	
	set balance(balance: Balance) {
		this._balance = balance;
	}
	
	constructor() {
		makeAutoObservable<this, PrivateFields>(
			this,
			{_root: false},
			{autoBind: true, deep: false},
		);
	}
	
	async getBalance(currency: string) {
		try {
			const balanceResponse = await userApi.getBalance(currency);
			
			runInAction(() => {
				this._balance = balanceResponse;
			});
			
			return balanceResponse;
		} catch (error) {
			console.error(error);
		}
	}
}