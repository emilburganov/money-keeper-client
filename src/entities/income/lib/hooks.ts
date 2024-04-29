import { useContext } from "react";
import { IncomeStoreContext } from "./context";

export const useIncomeStore = () => {
  const store = useContext(IncomeStoreContext);

  if (!store) {
    throw new Error("Income Store has not been installed!");
  }

  return store;
};
