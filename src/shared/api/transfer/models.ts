import { Account } from "../account";
import { Category } from "../category";

export interface Transfer {
	id: number;
	title: string;
	amount: number;
	category: Category;
	account_from_id: Account;
	account_to_id: Account;
}

export interface TransferBody {
	title: string;
	amount: string;
	account_from_id: number;
	account_to_id: number;
}
