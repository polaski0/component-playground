//#region 
type TGenericRules = {
    required: boolean;
    minLength: number;
    matches: RegExp;
};

type TRulePropertiesExtension<T> = {
    value: T;
    message: string;
};

type TExtendedRules<T> = {
    [K in keyof T]: T[K] | TRulePropertiesExtension<T[K]>;
}

type TSchema = {
    [K: string]: Partial<TExtendedRules<TGenericRules>>;
}
//#endregion

type TPayload = {
    [key: string]: unknown;
};

const validateValue = (payload: TPayload, rules: TSchema) => {
    const errors = {};

    console.log(payload);

    for (const key in rules) {
        console.log(rules[key]);
    }

    return errors;
};

export { validateValue };
export type { TGenericRules, TRulePropertiesExtension, TPayload, TSchema };