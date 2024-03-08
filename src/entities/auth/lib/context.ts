import { AuthStore } from "../model/store";
import { createContext } from "react";

export const AuthStoreContext = createContext<null | AuthStore>(null);
