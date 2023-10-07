import './Tabs.css';
import React from 'react';
import { TTabListProps, TTabPanelsProps, TTabProps, TTabsProps } from './types';
import { TabsContextProvider, useTabsContext } from './context';

const Tabs = ({ children }: TTabsProps) => {
    return (
        <TabsContextProvider>
            <div className='__common-ui-tabs'>
                {children}
            </div>
        </TabsContextProvider>
    )
};

const TabList = ({ children }: TTabListProps) => {
    const context = useTabsContext();

    return (
        <div className='__common-ui-tab-list'>
            {children}
        </div>
    )
};

const Tab = ({ children, ...props }: TTabProps) => {
    const context = useTabsContext();

    return (
        <button className='__common-ui-tab' {...props}>{children}</button>
    )
};

const TabPanels = ({ children }: TTabPanelsProps) => {
    const context = useTabsContext();

    return (
        <div className='__common-ui-tab-panels'>
            {children}
        </div>
    )
};

const TabPanel = ({ children }: TTabPanelsProps) => {
    const context = useTabsContext();

    return (
        <div className='__common-ui-tab-panel'>
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