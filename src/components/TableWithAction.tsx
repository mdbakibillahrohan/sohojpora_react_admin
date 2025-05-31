import {Table, Input, Button, Tooltip, Space, DatePicker} from 'antd';
import { SearchOutlined, FilterOutlined , ExportOutlined }  from '@ant-design/icons';
const {RangePicker} = DatePicker;







import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface TableWithActionProps<T = unknown> {
    columns: ColumnsType<T>;
    dataSource: T[];
    searchPlaceholder?: string;
    searchText: string;
    setSearchText: (value: string) => void;
    extraAction?: React.ReactNode;
    specialSearch?: boolean;
    [key: string]: unknown; 
}

const TableWithAction = <T extends object >({columns, dataSource, searchPlaceholder, searchText, setSearchText, extraAction, specialSearch, ...rest}: TableWithActionProps<T>) => {
    return (
        <div>
            <div className='flex justify-between mb-4 flex-col sm:flex-row gap-4'>
                <Input
                    placeholder={searchPlaceholder || "Search..."}
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange = { e => setSearchText(e.target.value)}
                    style={{ width: 400 }}
                    allowClear
                    className='md:max-w-2/3 max-w-full'
                />
                
                <Space>
                    {specialSearch ? <RangePicker placeholder={["Start Date", "End Date"]} />:false}
                    <Tooltip title="Filter">
                        <Button icon={<FilterOutlined/>}>Filter</Button>
                    </Tooltip>
                    <Tooltip title="Export">
                        <Button icon={<ExportOutlined/>}>Export</Button>
                    </Tooltip>
                    {extraAction}
                </Space>
            </div>
            <Table columns={columns} dataSource={dataSource} {...rest}/>
        </div>
    );
};

export default TableWithAction;