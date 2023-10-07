const generateId = (key: string) => {
    return `${key}-tab`;
};

const classNames = (...classNames: string[]) => {
    let combined = "";

    for (const key in classNames) {
        if (classNames[key] === "" || classNames[key] === undefined) {
            continue;
        }

        if (combined === "") {
            combined += classNames[key];
        } else {
            combined += " " + classNames[key];
        }
    }

    return combined;
};

export { generateId, classNames };