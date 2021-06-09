import React from "react";
import { format } from "date-fns";

interface DateComponentProps {
    date: Date;
}

const DateComponent: React.FC<DateComponentProps> = ({ date }) => {
    const dateString = format(new Date(date), "dd/MM/yyyy");
    return <span>{dateString}</span>
}

export default DateComponent;