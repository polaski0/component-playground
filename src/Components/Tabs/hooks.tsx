/**
 * 
 * Components with hooks
 * Used for headless UI
 * 
 * Level of Priority
 * * - Low
 * ** - Medium
 * *** - High
 * 
 * useTab
 *  - Handles ID / key ***
 *  - Handles disabled state *
 *  - Handles active / selected state ***
 *  - Handle aria for tab role
 *  - Handles index
 * 
 * useTabList
 *  - Handles orientation *
 *  - Handles key press
 *  - Handles aria for tab-list role
 *  - Handles all disabled keys array **
 * 
 * useTabPanel
 *  - Handles selected content ***
 *  - Handles aria for tab panel role
 */
import { useState } from "react";
import { TTabProps } from "./types";

const useTab = (props: TTabProps) => {
    const { id, ...other } = props;

    const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
    const [isDisabled, setIsDisabled] = useState(false);

    const isSelected = id === selectedKey;

    return {
        tabProps: {
            ...other,
            role: 'tab',
        },
        id,
        isSelected,
        setSelectedKey,
        isDisabled,
        setIsDisabled
    }
};

const useTabList = () => {

};

const useTabPanel = () => {

};

export {
    useTab,
    useTabList,
    useTabPanel,
};