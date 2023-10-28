import {TFunction} from "i18next";
import {useEffect} from "react";

const useTranslationTrigger = (
    translation: TFunction,
    callback: () => void,
    isInvalid: boolean,
) => {
    useEffect(() => {
        if (isInvalid) {
            setTimeout(callback, 0);
        }
    }, [translation]);
};

export default useTranslationTrigger;
