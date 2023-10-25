import {yupResolver} from "@hookform/resolvers/yup";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

const useSchemaResolver = (schema) => {
    const {i18n} = useTranslation();

    const resolver = useMemo(schema, [i18n.language]);

    return yupResolver(resolver);
};

export default useSchemaResolver;
