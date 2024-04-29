export interface Category {
  id: number;
  title: string;
  type: CategoryType;
}

export enum CategoryType {
  INCOMES = "Incomes",
  EXPENSES = "Expenses",
}

export interface CategoryBody {
  title: string;
  type: string;
}
