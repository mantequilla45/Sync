"use-client";


import React from 'react';

interface TaskDetailProps {
    id: number;
    title: string;
    phase: string;
    dateRange: string;
    daysLeft: string;
}

const Task: React.FC<TaskDetailProps> = ({ title, phase, dateRange, daysLeft }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p>Title: {title}</p>
            <p>Phase: {phase}</p>
            <p>Date Range: {dateRange}</p>
            <p>Days Left: {daysLeft}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default Task;
