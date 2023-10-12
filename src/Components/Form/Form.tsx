import { TFormProps } from "./types";

const Form = ({ children, ...props }: TFormProps) => {
    return (
        <form {...props}>
            {children}
        </form>
    )
};

export { Form };