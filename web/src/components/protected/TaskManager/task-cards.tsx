import React from 'react';
import { FaFlag, FaHourglassStart } from "react-icons/fa";

interface TaskCardProps {
    title: string;
    phase: string;
    dateRange: string;
    daysLeft: string;
    color: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, phase, dateRange, daysLeft, color }) => (
    <div className="flex bg-white w-[350px] h-auto rounded-xl p-6 flex-col gap-6">
        <div className="flex w-full justify-between">
            <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <div style={{ backgroundColor: color }} className="rounded-full w-[18px] h-[18px]" />
                    <p style={{ color: "#707070", fontWeight: 400 }}>{phase}</p>
                </div>
                <p className="text-2xl text-[#000000] ml-2">{title}</p>
            </div>
            <div className="bg-[#D9D9D9] w-[50px] h-[50px] rounded-full"></div>
        </div>
        <div className="flex w-full justify-between">
            <div className="flex items-center gap-1 ml-[2px]">
                <FaFlag className="w-[15px] h-[15px] text-[#1E9700] mt-[-1px]" />
                <p className="text-md text-[#000000] ml-2">{dateRange}</p>
            </div>
            <div className="flex items-center">
                <FaHourglassStart className="w-[15px] h-[15px] text-[#DB692C] mt-[-1px]" />
                <p className="text-md text-[#707070] ml-2">{daysLeft}</p>
            </div>
        </div>
    </div>
);

export default TaskCard;