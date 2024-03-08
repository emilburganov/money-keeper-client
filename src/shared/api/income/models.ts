import { Account } from "../account";
import { Category } from "../category";

export interface Income {
	id: number;
	title: string;
	amount: number;
	category: Category;
	account: Account;
}

export interface IncomeBody {
	title: string;
	amount: string;
	category_id: number;
	account_id: number;
}
