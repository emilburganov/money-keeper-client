import { useContext } from "react";
import { ExpenseStoreContext } from "./context";

export const useExpenseStore = () => {
  const store = useContext(ExpenseStoreContext);

  if (!store) {
    throw new Error("Expense Store has not been installed!");
  }

  return store;
};
