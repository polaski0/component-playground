import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TTabContext, TabValue } from './types';

const TabsContext = createContext<TTabContext | undefined>(undefined);

const useTabsContext = () => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("Context cannot be used outside the Tabs component.");
    }

    return context;
};

const TabsContextProvider = ({ defaultValue, children }: { defaultValue: TabValue, children: ReactNode }) => {
    const [selectedTab, setSelectedTab] = useState("");

    const contextValue: TTabContext = {
        selectedTab,
        setSelectedTab
    };

    useEffect(() => {
        setSelectedTab(defaultValue);
    }, []);

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    )
};

export {
    useTabsContext,
    TabsContextProvider
};