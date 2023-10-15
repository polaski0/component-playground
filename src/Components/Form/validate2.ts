import { locale } from "./locales";
import { validator } from "./utils";

export type GenericRules = {
    required: boolean;
    min: number;
    max: number;

    alpha_numeric: boolean;
    alpha_dash: boolean;
    integer: boolean;
    string: boolean;
    matches: RegExp;

    lowercase: boolean;
    uppercase: boolean;
    contains: Array<unknown>;
    email: boolean;
};

type PartialGenericRules = Partial<GenericRules>;

type ExtendedOptions<T> = {
    value: T;
    message?: string;
};

type CombineRules<T> = {
    [key in keyof T]: T[key] | ExtendedOptions<T[key]>;
};

export type Schema = {
    [key: string]: CombineRules<PartialGenericRules>;
};

export type Payload = {
    [key: string]: unknown;
};

// Implementation example
const _mockSchema: Schema = {
    email: {
        required: true,
        matches: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "The {name} must be a valid email."
        },
    },
    password: {
        required: true,
        min: 8
    }
};

const isExtendedOptions = <T>(value: unknown): value is ExtendedOptions<T> => {
    if (value === null) {
        return false;
    }

    return typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('message');
}

// Validation entry point
//#region
const test = (inputs: Payload, props: Schema) => {
    const result: { [key: string]: any } = {};

    if (Object.keys(props).length === 0) {
        return result;
    }

    for (const [propKey, propValue] of Object.entries(props)) {
        const inputValue = inputs[propKey];
        const ruleSet = propValue;
        let isRequired = isExtendedOptions(ruleSet.required) ? ruleSet.required.value : ruleSet.required ?? false;

        for (const [ruleSetKey, ruleSetValue] of Object.entries(ruleSet)) {
            let key = ruleSetKey as keyof GenericRules;

            if (!isRequired && (inputValue === "" || inputValue === undefined)) {
                continue;
            }

            const payload = {
                input: inputValue,
                value: isExtendedOptions(ruleSetValue) && ruleSetValue.value ? ruleSetValue.value : ruleSetValue
            };

            const fn = rules[key];
            const error = fn(payload as any);

            if (error) {
                const msg = formatMessage({
                    key: propKey,
                    error: {
                        key: key,
                        value: isExtendedOptions(ruleSetValue) && ruleSetValue.value ? ruleSetValue.value : ruleSetValue as any
                    },
                    message: isExtendedOptions(ruleSetValue) && ruleSetValue.message ? ruleSetValue.message : locale[key]
                });

                const err = {
                    [ruleSetKey]: {
                        message: msg
                    }
                };

                if (result.hasOwnProperty(propKey)) {
                    Object.assign(result[propKey], err);
                } else {
                    Object.assign(result, { [propKey]: err });
                }
            }
        }
    }

    return result;
}
//#endregion

type FormatMessageProps = {
    key: string;
    error: {
        key: keyof GenericRules;
        value: GenericRules[keyof GenericRules];
    }
    message: string;
};

const formatMessage = (args: FormatMessageProps) => {
    let msg = args.message;
    const { key, value } = args.error;

    msg = msg.replace("{name}", args.key.replace(/_/g, " "));

    try {
        msg = msg.replace(`{${key}}`, value.toString());
    } catch (error) {
        console.error("Cannot convert the given value to string.");
    }
    
    return msg;
};

// Validation logics
//#region
type RulesArgs<T> = {
    input: unknown;
    value: T;
};

type RulesProps = {
    [key in keyof GenericRules]: (args: RulesArgs<GenericRules[key]>) => boolean;
}

/**
 * If the function returns true, it means that the value is invalid,
 * otherwise, valid.
 * 
 * @returns {boolean}
 */
const rules: RulesProps = {
    required(args) {
        return validator.IsEmpty(args.input);
    },

    alpha_dash(args) {
        if (typeof args.input === "string") {
            const regex = /^[a-zA-Z0-9-_]+$/;
            return !regex.test(args.input);
        }

        return true;
    },

    alpha_numeric(args) {
        if (typeof args.input === "string") {
            const regex = /^[a-zA-Z0-9]+$/;
            return !regex.test(args.input);
        }
        return true;
    },

    contains(args) {
        return !(args.value.includes(args.input));
    },

    email(args) {
        if (typeof args.input === "string") {
            return validator.IsEmail(args.input as string)
        }

        return true;
    },

    integer(args) {
        return !validator.IsInteger(args.input);
    },

    lowercase(args) {
        if (typeof args.input === "string") {
            return args.input !== args.input.toLowerCase();
        }

        return true;
    },

    max(args) {
        if (typeof args.input === "number" || typeof args.input === "string") {
            return args.input.toString().length > args.value;
        } else if (args.input instanceof Array) {
            return args.input.length > args.value;
        } else if (args.input instanceof Object) {
            return Object.entries(args.input).length > args.value;
        }

        return true;
    },

    min(args) {
        if (typeof args.input === "number" || typeof args.input === "string") {
            return args.input.toString().length < args.value;
        } else if (args.input instanceof Array) {
            return args.input.length < args.value;
        } else if (args.input instanceof Object) {
            return Object.entries(args.input).length < args.value;
        }

        return true;
    },

    string(args) {
        return !validator.IsString(args.input);
    },

    uppercase(args) {
        if (typeof args.input === "string") {
            return args.input !== args.input.toUpperCase();
        }

        return true;
    },

    matches(args) {
        if (typeof args.input === "string") {
            return !validator.Regex.Match(args.value, args.input);
        }

        return true;
    },
};
//#endregion

export { test };