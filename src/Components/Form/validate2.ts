import { locale } from "./locales";
import { validator } from "./utils";

export type GenericRules = {
    required: boolean;
    min: number;
    max: number;

    alphanumeric: string;
    alphaDash: string;
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

function isExtendedOptions<T>(value: unknown): value is ExtendedOptions<T> {
    if (value === null) {
        return false;
    }

    return typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('message');
}

// Validation entry point
//#region
const test = (inputs: Payload, props: Schema) => {
    const result = {};

    if (Object.keys(props).length === 0) {
        return result;
    }

    for (const [propKey, propValue] of Object.entries(props)) {
        const inputValue = inputs[propKey];
        const ruleSet = propValue;

        for (const [ruleSetKey, ruleSetValue] of Object.entries(ruleSet)) {
            const payload = {
                input: inputValue,
                props: ruleSetValue as CombineRules<PartialGenericRules>
            };

            const fn = rules[ruleSetKey as keyof GenericRules];
            const error = fn(payload);

            if (error) {
                console.log(`[${propKey} && ${ruleSetKey}]:`, inputValue, error);
            }
        }
    }

    return result;
}
//#endregion


// Validation logics
//#region
type RulesArgs = {
    input: unknown;
    props: CombineRules<PartialGenericRules>;
};

type RulesProps = {
    [key in keyof GenericRules]: (args: RulesArgs) => string | void;
}

const rules: RulesProps = {
    required(args) {
        let msg = locale.required;

        if (isExtendedOptions(args.props) && args.props.message && args.props.message) {
            msg = args.props.message;
        }

        if (typeof args.input === "string") {
            return validator.IsEmpty(args.input)
                ? msg
                : undefined;
        }

        return msg;
    },

    alphaDash(args) {

    },

    alphanumeric(args) {

    },

    contains(args) {

    },

    email(args) {
        let msg = locale.email;

        if (isExtendedOptions(args.props) && args.props.message && args.props.message) {
            msg = args.props.message;
        }

        if (typeof args.input === "string") {
            return !validator.IsEmail(args.input)
                ? msg
                : undefined
        };

        return msg;
    },

    integer(args) {

    },

    lowercase(args) {

    },

    max(args) {

    },

    min(args) {
        let v = 0;
        let p = 0;
        let msg = locale.min;

        if (typeof args.input === "number" || typeof args.input === "string") {
            v = args.input.toString().length;
        } else if (args.input instanceof Array) {
            v = args.input.length;
        }

        if (isExtendedOptions(args.props) && args.props.message) {
            p = args.props.value as number;

            if (args.props.message) {
                msg = args.props.message;
            }
        } else {
            p = args.props as number;
        }

        return v < p
            ? msg
            : undefined;
    },
    
    string(args) {
        let msg = locale.string;

        return validator.IsString(args.input)
            ? msg
            : undefined;
    },

    uppercase(args) {

    },

    matches(args) {
        let regex: RegExp;
        let msg = locale.matches;

        if (isExtendedOptions(args.props) && args.props.message) {
            regex = args.props.value as RegExp;

            if (args.props.message) {
                msg = args.props.message;
            }
        } else {
            regex = args.props as RegExp;
        }

        if (typeof args.input === "string") {
            return !validator.Regex.Match(regex, args.input)
                ? msg
                : undefined;
        }

        return msg;
    },
};
//#endregion

export { test };