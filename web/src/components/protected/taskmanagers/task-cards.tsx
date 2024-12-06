import React from 'react';
import { FaFlag, FaHourglassStart } from "react-icons/fa";

interface TaskCardProps {
    title: string;
    phase: string;
    dateRange: string;
    daysLeft: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, phase, dateRange, daysLeft }) => {
    const getPhaseDetails = (phase: string) => {
        switch (phase) {
            case '1':
                return { color: '#FF5722', description: 'Phase 1 - Design' };
            case '2':
                return { color: '#4CAF50', description: 'Phase 2 - Planning' };
            case '3':
                return { color: '#F55D76', description: 'Phase 3 - Development' };
            case '4':
                return { color: '#A228FF', description: 'Phase 4 - Execution' };
            default:
                return { color: '#000000', description: 'Unknown Phase' };
        }
    };

    const { color, description } = getPhaseDetails(phase);

    return (
    <div className="flex bg-white w-[350px] h-auto rounded-xl p-6 flex-col gap-6 transition-transform duration-200 shadow-md hover:shadow-lg hover:scale-[0.99]">
            <div className="flex w-full justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <div style={{ backgroundColor: color }} className="rounded-full w-[18px] h-[18px]" />
                        <p style={{ color: "#707070", fontWeight: 400 }}>{description}</p>
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
                    <p className="text-md text-[#707070] ml-2">{daysLeft}d</p>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
