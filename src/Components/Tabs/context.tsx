import { ReactNode, createContext, useContext } from 'react';
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
    return (
        <TabsContext.Provider value={undefined}>
            {children}
        </TabsContext.Provider>
    )
};

export {
    useTabsContext,
    TabsContextProvider
};