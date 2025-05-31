import {Tabs,Badge} from 'antd';


interface TabWithBadge {
    key: string;
    label: React.ReactNode;
    count: number;
}

interface TabsWithBadgeProps {
    activeKey: string;
    tabs: TabWithBadge[];
    onChange: (activeKey: string) => void;
}

const TabsWithBadge: React.FC<TabsWithBadgeProps> = ({ activeKey, tabs, onChange }) => {
    return (
        <Tabs activeKey={activeKey} onChange={onChange} >
            {tabs.map((tab) => (
                <Tabs.TabPane
                    tab={
                        <Badge count={tab.count}>
                            <span className='pr-4'>{tab.label}</span>
                        </Badge>
                    }
                    key={tab.key}
                />
            ))}
        </Tabs>
    );
};

export default TabsWithBadge;