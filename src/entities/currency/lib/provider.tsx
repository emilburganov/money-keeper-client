import type { ReactNode } from "react";
import { CurrencyStore } from "../model/store";

import { CurrencyStoreContext } from "./context";

interface CurrencyProviderProps {
	children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
	const store = new CurrencyStore();

	return (
		<CurrencyStoreContext.Provider value={store}>
			{children}
		</CurrencyStoreContext.Provider>
	);
};
