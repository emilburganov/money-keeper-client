import {useEffect} from "react";

export const useTranslationTrigger = (translation, callback, isInvalid) => {
    useEffect(() => {
        if (isInvalid) {
            setTimeout(callback, 0);
        }
    }, [translation]);
};
