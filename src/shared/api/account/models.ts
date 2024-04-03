import { Currency } from "../currency";

export interface Account {
	id: number;
	title: string;
	currency: Currency
}

export interface AccountBody {
	title: string;
	currency_id: number;
}

export interface AccountsStats {
	labels: string[],
	values: number[],
}