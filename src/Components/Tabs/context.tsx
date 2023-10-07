import { ReactNode, createContext, useContext, useState } from 'react';
import { TTabContext } from './types';

const TabsContext = createContext<TTabContext | undefined>(undefined);

const useTabsContext = () => {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("Context cannot be used outside the Tabs component.");
    }

    return context;
};

const TabsContextProvider = ({ children }: { children: ReactNode }) => {
    const [active, setActive] = useState(0);

    const contextValue: TTabContext = {
        active,
        setActive
    };

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