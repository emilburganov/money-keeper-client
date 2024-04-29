import { Account } from "../account";
import { Category } from "../category";

export interface Transfer {
  id: number;
  title: string;
  amount: number;
  category: Category;
  account_from: Account;
  account_to: Account;
  created_at: string;
}

export interface TransferBody {
  title: string;
  amount: string;
  account_from_id: number;
  account_to_id: number;
}

export interface TransfersStats {
  labels: string[];
  values: number[];
}
