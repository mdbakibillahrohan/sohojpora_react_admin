import React from 'react';
import { Calendar,Badge } from 'antd';

const CalendarEvents:React.FC = ({events,dataCellRender}) => {
    return (
        <div>
            <Calendar cellRender={dataCellRender} />
        </div>
    );
};

export default CalendarEvents;