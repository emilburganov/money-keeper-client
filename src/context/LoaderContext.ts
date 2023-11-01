import {createContext} from "react";

const LoaderContext = createContext({
    isLoading: false,
    setLoading: () => {},
});

export default LoaderContext;