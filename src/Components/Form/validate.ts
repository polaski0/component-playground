import { validator } from "./utils";
import { locale } from "./locales";

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
    [key: string]: Partial<TExtendedRules<TGenericRules>>;
}
//#endregion

type TPayload = {
    [key: string]: unknown;
};

const isExtendedRules = <T>(value: unknown | TRulePropertiesExtension<T>): value is TRulePropertiesExtension<T> => {
    return (value as TRulePropertiesExtension<T>).value !== undefined;
}

const appendValueToObject = (target: Object, value: unknown) => {

}

const validateValue = (payload: TPayload, rules: TSchema) => {
    const errors = {};

    for (const key in rules) {
        const value = payload[key];
        const ruleSet = rules[key];

        if (value !== undefined) {
            for (const ruleKey in ruleSet) {
                const _payload = {
                    payload: value,
                    rules: ruleSet[ruleKey]
                };

                const fn = checks[ruleKey];
                const error = fn(_payload);

                if (error !== undefined) {
                    Object.assign(errors,
                        {
                            [key]: isExtendedRules(ruleSet[ruleKey])
                                ? ruleSet[ruleKey].message
                                : ruleSet[key]
                        }
                    );
                }
            }
        }
    }

    // console.log(errors);

    return errors;
};

type TChecks = {
    [K in keyof TGenericRules]: ({ payload, rules }: { payload: unknown, rules: Required<TSchema[K]> }) => string | undefined;
}

const checks: TChecks = {
    required({ payload }) {
        return validator.IsEmpty(payload)
            ? locale.required
            : undefined;
    },
    minLength({ payload, rules }) {
        let value: number = 0;

        if (isExtendedRules(rules)) {
            value = rules.value as number;
        } else {
            if (typeof rules === "number") {
                value = rules;
            }
        }

        if (typeof payload === "number") {
            return payload.toString().length <= value
                ? undefined
                : locale.minLength;
        } else if (typeof payload === "string") {
            return payload.length <= value
                ? undefined
                : locale.minLength;
        } else if (typeof payload === "object" && payload !== null) {
            return Object.keys(payload).length <= value
                ? undefined
                : locale.minLength;
        }

        return undefined;
    },
    matches({ payload, rules }) {
        if (typeof payload === "string") {
            let regex: RegExp = /g/;

            if (isExtendedRules(rules)) {
                regex = rules.value as RegExp;
            } else {
                if (rules instanceof RegExp) {
                    regex = rules;
                }
            }

            return validator.Regex.Match(regex, payload)
                ? undefined
                : locale.matches;
        }

        return undefined;
    },
}

export { validateValue };
export type { TGenericRules, TRulePropertiesExtension, TPayload, TSchema };