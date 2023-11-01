import {createContext, Dispatch, SetStateAction} from "react";

interface LoaderContextProps {
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}

const LoaderContext = createContext<LoaderContextProps>({
    isLoading: false,
    setLoading: () => {},
});

export default LoaderContext;