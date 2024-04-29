import type { ReactNode } from "react";
import { IncomeStore } from "../model/store";

import { IncomeStoreContext } from "./context";

interface IncomeProviderProps {
  children?: ReactNode;
}

export const IncomeProvider = ({ children }: IncomeProviderProps) => {
  const store = new IncomeStore();

  return (
    <IncomeStoreContext.Provider value={store}>
      {children}
    </IncomeStoreContext.Provider>
  );
};
