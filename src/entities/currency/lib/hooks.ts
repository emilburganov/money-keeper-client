import { useContext } from "react";
import { CurrencyStoreContext } from "./context";

export const useCurrencyStore = () => {
	const store = useContext(CurrencyStoreContext);

	if (!store) {
		throw new Error("Currency Store has not been installed!");
	}

	return store;
};
