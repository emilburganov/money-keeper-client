import { useContext } from "react";
import { UserStoreContext } from "./context";

export const useUserStore = () => {
	const store = useContext(UserStoreContext);

	if (!store) {
		throw new Error("User Store has not been installed!");
	}

	return store;
};
