import { useContext } from "react";
import { TransferStoreContext } from "./context";

export const useTransferStore = () => {
  const store = useContext(TransferStoreContext);

  if (!store) {
    throw new Error("Transfer Store has not been installed!");
  }

  return store;
};
