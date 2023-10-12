import { FormHTMLAttributes } from "react";

type TFormProps = {
    children: React.ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;    

export type { TFormProps };