import {useEffect, useRef} from "react";

const useUnload = (callback: () => void) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        const handleUnload = callbackRef.current;

        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [callbackRef]);
};

export default useUnload;