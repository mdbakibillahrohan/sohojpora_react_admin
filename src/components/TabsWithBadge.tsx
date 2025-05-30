import {Tabs,Badge} from 'antd';


const TabsWithBadge:React.FC = ({activeKey,tabs,onChange}) => {
    return (
        <Tabs activeKey={activeKey} onChange={onChange} >
            {tabs.map((tab,index)=>(
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