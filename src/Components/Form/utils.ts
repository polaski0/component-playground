const validator = {
    // improve function below
    IsEmpty: (data: unknown): boolean => {
        if (data === undefined || data === null) {
            return true;
        } else if (typeof data === "string" && data.trim() === "") {
            return true;
        } else if (typeof data === "object" && Object.keys(data).length === 0) {
            return true;
        } else if (typeof data === "number" && isNaN(data)) {
            return true;
        } else {
            return false;
        }
    },
    IsInteger: (data: unknown): boolean => {
        return Number.isInteger(data);
    },
    IsNumber: (data: unknown): boolean => {
        return typeof data === "number" && !isNaN(data);
    },

    IsString: (data: unknown): boolean => {
        return typeof data === "string";
    },

    IsEmail: (email: string) => {
        return validator.Regex.Match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email);
    },
    IsValidWebAddress: (webAddress: unknown): boolean => {
        return typeof webAddress === "string"
            ? validator.Regex.Match(
                /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/,
                webAddress
            ) : false;
    },

    CheckLength: (str: string, min: number, max: number): boolean => {
        const passed: boolean = str.trim().length <= max && str.trim().length >= min;
        return passed;
    },
    Regex: {
        Match: (regex: RegExp, text: string): boolean => {
            return regex.test(text);
        },
    },
};

export { validator };