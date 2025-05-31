import React from 'react';
import {List, Avatar} from 'antd';

type AvatarItem = {
    id: string | number;
    [key: string]:  any;
};

type AvatarListsProps = {
    getIcon: (item: AvatarItem) => React.ReactNode;
    data: AvatarItem[];
    getTitle: (item: AvatarItem) => React.ReactNode;
    getDescription: (item: AvatarItem) => React.ReactNode;
};

const AvatarLists: React.FC<AvatarListsProps> = ({getIcon, data, getTitle, getDescription}) => {
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