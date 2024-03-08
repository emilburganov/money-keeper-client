import type { ReactNode } from "react";
import { AuthStore } from "../model/store";
import { AuthStoreContext } from "./context";

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const store = new AuthStore();

	return (
		<AuthStoreContext.Provider value={store}>
			{children}
		</AuthStoreContext.Provider>
	);
};
