import type { ReactNode } from "react";
import { UserStore } from "../model/store";

import { UserStoreContext } from "./context";

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const store = new UserStore();

	return (
		<UserStoreContext.Provider value={store}>
			{children}
		</UserStoreContext.Provider>
	);
};
