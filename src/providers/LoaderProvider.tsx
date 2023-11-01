import LoaderContext from "@/context/LoaderContext";
import {FC, ReactElement, useState} from "react";

interface LoaderProviderProps {
    children: ReactElement | ReactElement[];
}

const LoaderProvider: FC<LoaderProviderProps> = ({children}) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <LoaderContext.Provider value={{isLoading, setLoading}}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderProvider;