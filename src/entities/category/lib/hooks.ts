import { useContext } from "react";
import { CategoryStoreContext } from "./context";

export const useCategoryStore = () => {
  const store = useContext(CategoryStoreContext);

  if (!store) {
    throw new Error("Category Store has not been installed!");
  }

  return store;
};
