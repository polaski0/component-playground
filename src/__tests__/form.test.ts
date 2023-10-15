import { expect, test } from "vitest";
import { test as validateValue } from "../Components/Form/validate2";
import { Schema } from "../Components/Form/validate2";

const formSchema: Schema = {
    email: {
        required: true,
        matches: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "This is a custom error message."
        }
    },
    password: {
        required: true,
        min: 8
    },
    first_name: {
        required: true,
        string: true,
    },
    middle_name: {
        string: true,
    },
    last_name: {
        required: true,
        string: true,
    },
    role: {
        required: true,
        contains: ["user", "admin"]
    },
    code: {
        alpha_dash: true
    },
    code1: {
        alpha_numeric: true
    },
};

test("form submitted to pass the validation", () => {
    const payload = {
        email: "test@test.com",
        password: "abcd1234",
        first_name: "John",
        middle_name: "",
        last_name: "Doe",
        role: "admin",
        code: "1234-5678",
        code1: "ABC100"
    };

    const expectedPayload = {};

    const isValid = validateValue(payload, formSchema);
    expect(isValid).toStrictEqual(expectedPayload);
});

test("form submitted to fail the validation", () => {
    const payload = {
        email: "",
        password: "abcd1234",
        first_name: 123,
        middle_name: "",
        last_name: "",
        role: "unknown",
        code: "1234 5678",
        code1: "ABC 100"
    };

    const expectedPayload = {
        email: {
            required: {
                message: "The email field is required."
            },
            matches: {
                message: "This is a custom error message."
            }
        },
        first_name: {
            string: {
                message: "The first name field must be a string."
            }
        },
        last_name: {
            required: {
                message: "The last name field is required."
            }
        },
        role: {
            contains: {
                message: 'The role field must contain one of the following values: user,admin.'
            }
        },
        code: {
            alpha_dash: {
                message: "The code field must only contain alpha-numeric characters, underscores, and hyphens."
            }
        },
        code1: {
            alpha_numeric: {
                message: "The code1 field must only contain alphanumeric characters.",
            },
        }
    }

    const isValid = validateValue(payload, formSchema);
    expect(isValid).toStrictEqual(expectedPayload);
});