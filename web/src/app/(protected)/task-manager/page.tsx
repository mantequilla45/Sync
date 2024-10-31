import React from 'react';
import Header from '@/components/protected/_Layout/header';
import { TbDots } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { FaFlag } from "react-icons/fa6";
import { FaHourglassStart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface TaskCardProps {
    title: string;
    phase: string;
    dateRange: string; // or use a more specific type if applicable
    daysLeft: string;
    color: string;
}

// Task Card Component
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


// Header Component
interface SectionHeaderProps {
    title: string;
    count: number;
    color: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, count, color }) => (
    <div className="flex flex-col">
        <div className={`flex bg-[${color}] rounded-xl h-[40px] z-0`} />
        <div className="flex bg-white rounded-xl h-[40px] mt-[-37px] z-10 items-center px-5 gap-5">
            <div className="flex flex-row w-full justify-between">
                <div className="flex items-center gap-3">
                    <p style={{ color: "#000000", fontWeight: 600, fontSize: 17 }}>
                        {title}
                    </p>
                    <div className="border border-[#B8B8B8] rounded-full justify-center flex items-center py-0.5 px-4">
                        <p style={{ color: "#B8B8B8", fontWeight: 400 }}>{count}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <TbDots className="w-[30px] h-[30px] text-[#33363F]" />
                    <FiPlus className={`w-[23px] h-[23px] text-[${color}]`} />
                </div>
            </div>
        </div>
    </div>
);

interface MeetingCardProps {
    time: string;
    name: string;
    color: string; // New color prop for the meeting card
}

const meetings = [
    { time: "8:00AM - 9:30AM", name: "Meeting Name #1", color: "#74365B" },
    { time: "10:00AM - 11:30AM", name: "Meeting Name #2", color: "#5A3E91" },
    { time: "1:00PM - 2:30PM", name: "Meeting Name #3", color: "#F55D76" },
    { time: "3:00PM - 4:00PM", name: "Meeting Name #4", color: "#FFC700" },
    // Add more meetings as needed
];

// Meeting Card Component
const MeetingCard: React.FC<MeetingCardProps> = ({ time, name, color }) => (
    <div style={{ backgroundColor: color }} className="h-auto rounded-xl px-6 py-5 flex flex-col gap-2">
        <div className="flex flex-row w-full justify-between">
            <p className="text-xs font-light">{time}</p>
            <BsThreeDotsVertical className="w-[15px] h-[15px]" />
        </div>
        <p className="text-lg">{name}</p>
        <div className="flex flex-row gap-3">
            <div className="bg-white w-[35px] h-[35px] rounded-full" />
            <div className="bg-white w-[35px] h-[35px] rounded-full" />
            <div className="bg-white w-[35px] h-[35px] rounded-full" />
        </div>
    </div>
);

export default function TaskManager() {
    // Define tasks for each section
    const todoTasks = [
        { title: "Scale Marketing", phase: "Phase 4 - Execution", dateRange: "24/10/24 - 2/11/24", daysLeft: "4d", color: "#A228FF" },
        { title: "Design Prototype", phase: "Phase 1 - Design", dateRange: "20/10/24 - 24/10/24", daysLeft: "0d", color: "#FF5722" },
    ];

    const inProgressTasks = [
        { title: "Develop Product", phase: "Phase 3 - Development", dateRange: "20/10/24 - 25/10/24", daysLeft: "1d", color: "#F55D76" },
    ];

    const completedTasks = [
        { title: "Market Research", phase: "Phase 2 - Planning", dateRange: "15/10/24 - 19/10/24", daysLeft: "0d", color: "#4CAF50" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">Home / Task Manager</h1>
            </div>
            <div className="flex-grow rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
            >
                <div className="flex flex-row gap-14">
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-[#2B2B2B] font-semibold">Today's Task</h1>
                        <div className="flex flex-row gap-10">
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader title="To Do" count={todoTasks.length} color="#FFC700" />
                                {todoTasks.map((task, index) => (
                                    <TaskCard key={index} {...task} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader title="Work In Progress" count={inProgressTasks.length} color="#F55D76" />
                                {inProgressTasks.map((task, index) => (
                                    <TaskCard key={index} {...task} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader title="Completed" count={completedTasks.length} color="#FB0E9C" />
                                {completedTasks.map((task, index) => (
                                    <TaskCard key={index} {...task} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div>
                            <h1 className="text-2xl text-[#2B2B2B] font-semibold">Meetings</h1>
                            <div className="h-[1px] bg-gradient-to-r from-[#0F94B9] to-[#7B00FF] via-[#BF00B2] mt-1" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <p className="text-lg text-[#2B2B2B] font-semibold">Today</p>
                            <div className="grid grid-cols-2 gap-4 mt-2"> {/* Using grid for two cards per row */}
                                {meetings.map((meeting, index) => (
                                    <MeetingCard key={index} time={meeting.time} name={meeting.name} color={meeting.color} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col mt-3">
                            <p className="text-lg text-[#2B2B2B] font-semibold">Tomorrow</p>
                            <div className="grid grid-cols-2 gap-4 mt-2"> {/* Using grid for two cards per row */}
                                {meetings.map((meeting, index) => (
                                    <MeetingCard key={index} time={meeting.time} name={meeting.name} color={meeting.color} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
