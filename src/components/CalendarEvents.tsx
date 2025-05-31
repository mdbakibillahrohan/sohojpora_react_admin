import React from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';

interface CalendarEventsProps {
    dateCellRender: (date: Dayjs) => React.ReactNode;
}

const CalendarEvents: React.FC<CalendarEventsProps> = ({ dateCellRender }) => {
    return (
        <div>
            <Calendar cellRender={dateCellRender} />
        </div>
    );
};

export default CalendarEvents;