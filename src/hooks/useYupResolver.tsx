import {yupResolver} from "@hookform/resolvers/yup";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

export const useYupResolver = (schema) => {
    const {i18n} = useTranslation();

    const resolver = useMemo(schema, [i18n.language]);

    return yupResolver(resolver);
};
