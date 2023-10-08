import { ButtonHTMLAttributes, HTMLAttributes } from "react";

type TabValue = string;

type TTabsProps = {
    defaultValue: TabValue;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type TTabListProps = {
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type TTabProps = {
    value: TabValue;
} & ButtonHTMLAttributes<HTMLButtonElement>;
type TTabRef = HTMLButtonElement;

type TTabPanelsProps = {
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type TTabPanelProps = {
    value: TabValue;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type TTabContext = {
    selectedTab: TabValue;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabValue>>;
};

export type {
    TabValue,
    TTabsProps,
    TTabListProps,
    TTabProps,
    TTabRef,
    TTabPanelsProps,
    TTabPanelProps,
    TTabContext
};