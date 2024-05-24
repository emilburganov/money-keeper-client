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

export interface CategoriesStatsBody {
  date_from: string;
  date_to: string;
}

export interface CategoriesStats {
  labels: string[];
  values: number[];
}
