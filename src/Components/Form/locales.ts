import { GenericRules } from "./validate2";

type TLocaleType<T> = {
    [key in keyof T]: string;
}

const locale: TLocaleType<GenericRules> = {
    required: "The {name} field is required.",
    matches: "The {name} field format is invalid.",
    min: "The {name} field must be at least {min} characters long.",
    max: "The {name} field must be no more than {max} characters long.",
    integer: "The {name} field must be an integer.",
    string: "The {name} field must be a string.",
    alpha_dash: "The {name} field must only contain alpha-numeric characters, underscores, and hyphens.",
    alpha_numeric: "The {name} field must only contain alphanumeric characters.",
    contains: "The {name} field must contain one of the following values: {contains}.",
    email: "The {name} field must be a valid email address.",
    lowercase: "The {name} field must be in lowercase.",
    uppercase: "The {name} field must be in uppercase.",
};

export { locale };