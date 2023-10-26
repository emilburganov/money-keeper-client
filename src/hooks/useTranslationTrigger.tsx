import {useEffect} from "react";

interface useTranslationTriggerProps {
    translation: void;
    callback: void;
    isInvalid: boolean;
}

const useTranslationTrigger = (translation, callback, isInvalid: boolean): useTranslationTriggerProps => {
    useEffect(() => {
        if (isInvalid) {
            setTimeout(callback, 0);
        }
    }, [translation]);
};

export default useTranslationTrigger;
