import { ButtonHTMLAttributes } from "react";

type TTabsProps = {
    children: React.ReactNode;
};

type TTabListProps = {
    children: React.ReactNode;
};

type TTabProps = ButtonHTMLAttributes<HTMLButtonElement>;

type TTabPanelsProps = {
    children: React.ReactNode;
};

type TTabPanelProps = {
    children: React.ReactNode;
};

type TTabContext = {
    value: () => void;
}

export {
    type TTabsProps,
    type TTabListProps,
    type TTabProps,
    type TTabPanelsProps,
    type TTabPanelProps,
    type TTabContext
};