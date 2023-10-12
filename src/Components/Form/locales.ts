import { TGenericRules } from "./validate";

type TLocaleType<T> = {
    [key in keyof T]: string;
}

const locale: TLocaleType<TGenericRules> = {
    required: "The {name} field is required.",
    matches: "The {name} field does not match the {matches}.",
    minLength: "The {name} field must be less than {minLenght}.",
};

export { locale };