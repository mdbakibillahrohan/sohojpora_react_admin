import React from 'react';
import {List, Avatar} from 'antd';

const AvatarLists:React.FC = ({getIcon,data,getTitle, getDescription}) => {
    return (
        <div>
            <List
                itemLayout = 'horizontal'
                dataSource = {data}
                renderItem = {(item)=>(
                    <List.Item>
                        <List.Item.Meta
                            avatar = {<Avatar icon={getIcon(item)} />}
                            title = {getTitle(item)}
                            description = {getDescription(item)}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AvatarLists;