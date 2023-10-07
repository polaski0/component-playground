import "./Tabs.css";
import { TTabListProps, TTabPanelsProps, TTabProps, TTabRef, TTabsProps } from "./types";
import { TabsContextProvider } from "./context";
import { forwardRef } from "react";
import { useTab } from "./hooks";
import { classNames } from "./utils";

const Tabs = ({ children }: TTabsProps) => {
    return (
        <TabsContextProvider>
            <div className="__common-ui-tabs">
                {children}
            </div>
        </TabsContextProvider>
    )
};

const TabList = ({ children }: TTabListProps) => {
    // const context = useTabsContext();

    return (
        <div className={`__common-ui-tab-list`}>
            {children}
        </div>
    )
};

const Tab = forwardRef<TTabRef, TTabProps>(({ children, ...props }, ref) => {
    // const context = useTabsContext();

    const {
        tabProps,
        id,
        isDisabled,
        isSelected,
        setSelectedKey
    } = useTab(props);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedKey(id);
    }

    return (
        <button id={id} ref={ref} className={classNames("__common-ui-tab", isSelected ? "active" : "", isDisabled ? "disabled" : "")} onClick={handleClick} {...tabProps}>{children}</button>
    )
});

const TabPanels = ({ children }: TTabPanelsProps) => {
    // const context = useTabsContext();

    return (
        <div className={`__common-ui-tab-panels`}>
            {children}
        </div>
    )
};

const TabPanel = ({ children }: TTabPanelsProps) => {
    // const context = useTabsContext();

    return (
        <div className={`__common-ui-tab-panel`}>
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