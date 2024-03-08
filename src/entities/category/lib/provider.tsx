import type { ReactNode } from "react";
import { CategoryStore } from "../model/store";

import { CategoryStoreContext } from "./context";

interface CategoryProviderProps {
	children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
	const store = new CategoryStore();

	return (
		<CategoryStoreContext.Provider value={store}>
			{children}
		</CategoryStoreContext.Provider>
	);
};
