import { GenericRules } from "./validate2";

type TLocaleType<T> = {
    [key in keyof T]: string;
}

const locale: TLocaleType<GenericRules> = {
    required: "The {name} field is required.",
    matches: "The {name} field does not match the {matches}.",
    min: "${name} must be at least ${min} characters long",
    max: "${name} must be no more than ${max} characters long",
    integer: "${name} must be an integer",
    string: "${name} must be a string",
    alphaDash: "${name} must only contain alpha-numeric characters, underscores, and hyphens",
    alphanumeric: "${name} must only contain alphanumeric characters",
    contains: "${name} must contain one of the following values: ${contains}",
    email: "${name} must be a valid email address",
    lowercase: "${name} must be in lowercase",
    uppercase: "${name} must be in uppercase",
};

export { locale };