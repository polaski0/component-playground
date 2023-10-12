import { expect, test } from "vitest";
import { validateValue } from "../Components/Form/validate";
import { TSchema } from "../Components/Form/validate";

const formSchema: TSchema = {
    email: {
        required: true,
        matches: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "This is a custom error message."
        }
    },
    password: {
        required: true,
        minLength: 8
    }
};

test("form submitted to pass the validation", () => {
    const payload = {
        email: "test@test.com",
        password: "abcd1234"
    };

    const isValid = validateValue(payload, formSchema);
    expect(isValid).toMatchObject({});
});

test("form submitted to fail the validation", () => {
    const payload = {
        email: "",
        password: "abcd1234"
    };

    const isValid = validateValue(payload, formSchema);
    expect(isValid).to.equal({
        email: {
            required: {
                message: "The email field is required."
            },
            matches: {
                message: "This is a custom error message."
            }
        }
    });
});