import type { ReactNode } from "react";
import { AccountStore } from "../model/store";

import { AccountStoreContext } from "./context";

interface AccountProviderProps {
	children: ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
	const store = new AccountStore();

	return (
		<AccountStoreContext.Provider value={store}>
			{children}
		</AccountStoreContext.Provider>
	);
};
