import type { ReactNode } from "react";
import { ExpenseStore } from "../model/store";

import { ExpenseStoreContext } from "./context";

interface ExpenseProviderProps {
	children: ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
	const store = new ExpenseStore();

	return (
		<ExpenseStoreContext.Provider value={store}>
			{children}
		</ExpenseStoreContext.Provider>
	);
};
