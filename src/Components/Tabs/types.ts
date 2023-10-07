import { ButtonHTMLAttributes } from "react";

type TTabsProps = {
    children: React.ReactNode;
};

type TTabListProps = {
    children: React.ReactNode;
};

type TTabProps = {
    id: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type TTabRef = HTMLButtonElement;

type TTabPanelsProps = {
    children: React.ReactNode;
};

type TTabPanelProps = {
    children: React.ReactNode;
};

type TTabContext = {
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>
};

export type {
    TTabsProps,
    TTabListProps,
    TTabProps,
    TTabRef,
    TTabPanelsProps,
    TTabPanelProps,
    TTabContext
};