import {useEffect} from "react";

export const useTranslationTrigger = (translation, callback) => {
    useEffect(() => {
        return () => {
            setTimeout(callback, 0);
        };
    }, [translation]);
};
