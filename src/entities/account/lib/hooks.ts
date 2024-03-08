import { useContext } from "react";
import { AccountStoreContext } from "./context";

export const useAccountStore = () => {
	const store = useContext(AccountStoreContext);

	if (!store) {
		throw new Error("Account Store has not been installed!");
	}

	return store;
};
