import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../Components/Tabs/index';

const _tabs = new Array(5).fill(null);

export const TabsDemo = () => {
    return (
        <div>
            <Tabs defaultValue="0">
                <TabList>
                    {
                        _tabs.map((_, index) => <Tab key={index} value={`${index}`}>Button {index + 1}</Tab>)
                    }
                </TabList>
                <TabPanels>
                    {
                        _tabs.map((_, index) => (
                            <TabPanel key={index} value={`${index}`}>
                                <div>
                                    <p>This is content #{index + 1}</p>
                                </div>
                            </TabPanel>
                        ))
                    }
                </TabPanels>
            </Tabs>
        </div>
    )
}