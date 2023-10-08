import "./Tabs.css";
import { TTabListProps, TTabPanelProps, TTabPanelsProps, TTabProps, TTabRef, TTabsProps } from "./types";
import { TabsContextProvider, useTabsContext } from "./context";
import { forwardRef } from "react";
import { classNames } from "./utils";

const Tabs = ({ defaultValue, children, ...props }: TTabsProps) => {
    return (
        <TabsContextProvider defaultValue={defaultValue}>
            <div className="__common-ui-tabs" {...props}>
                {children}
            </div>
        </TabsContextProvider>
    )
};

const TabList = ({ children, ...props }: TTabListProps) => {
    return (
        <div className={`__common-ui-tab-list`} {...props}>
            {children}
        </div>
    )
};

const Tab = forwardRef<TTabRef, TTabProps>(({ children, ...props }, ref) => {
    const { selectedTab, setSelectedTab } = useTabsContext();
    const { value, onClick, ...otherProps } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedTab(value);

        if (onClick) {
            onClick(e);
        }
    }

    return (
        <button ref={ref} className={classNames("__common-ui-tab", selectedTab === value ? "active" : "")} onClick={handleClick} {...otherProps}>{children}</button>
    )
});

const TabPanels = ({ children, ...props }: TTabPanelsProps) => {
    return (
        <div className={`__common-ui-tab-panels`} {...props}>
            {children}
        </div>
    )
};

const TabPanel = ({ value, children, ...props }: TTabPanelProps) => {
    const { selectedTab } = useTabsContext();

    const isToggled = selectedTab === value;

    return (
        <div className={`__common-ui-tab-panel`} hidden={!isToggled} {...props}>
            {children}
        </div>
    )
};

export {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
};