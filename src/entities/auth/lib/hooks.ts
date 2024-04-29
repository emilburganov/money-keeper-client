import { AuthStoreContext } from "./context";
import { useContext } from "react";

export const useAuthStore = () => {
  const store = useContext(AuthStoreContext);

  if (!store) {
    throw new Error("Auth Store has not been installed!");
  }

  return store;
};
