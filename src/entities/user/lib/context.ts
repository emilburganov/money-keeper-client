import { UserStore } from "../model/store";
import { createContext } from "react";

export const UserStoreContext = createContext<null | UserStore>(null);
