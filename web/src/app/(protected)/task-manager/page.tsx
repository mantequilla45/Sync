"use client";
// TaskManager.tsx
import React, { useState } from 'react';
import Header from '@/components/protected/_Layout/header';
import TaskCard from '@/components/protected/TaskManager/task-cards';
import SectionHeader from '@/components/protected/TaskManager/section-header';
import MeetingCard, { meetings, getDateLabel, groupMeetingsByDate } from '@/components/protected/TaskManager/meeting-cards';

const initialTodoTasks = [
    { title: "Scale Marketing", phase: "Phase 4 - Execution", dateRange: "24/10/24 - 2/11/24", daysLeft: "4d", color: "#A228FF" },
    { title: "Design Prototype", phase: "Phase 1 - Design", dateRange: "20/10/24 - 24/10/24", daysLeft: "0d", color: "#FF5722" },
];

const initialInProgressTasks = [
    { title: "Develop Product", phase: "Phase 3 - Development", dateRange: "20/10/24 - 25/10/24", daysLeft: "1d", color: "#F55D76" },
];

const initialCompletedTasks = [
    { title: "Market Research", phase: "Phase 2 - Planning", dateRange: "15/10/24 - 19/10/24", daysLeft: "0d", color: "#4CAF50" },
];

export default function TaskManager() {
    const groupedMeetings = groupMeetingsByDate(meetings);
    
    const [todoTasks, setTodoTasks] = useState(initialTodoTasks);

    const addTask = (newTask: any) => {
        setTodoTasks([...todoTasks, newTask]);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">Home / Task Manager</h1>
            </div>
            <div className="flex-grow rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <div className="flex flex-row gap-14">
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-[#2B2B2B] font-semibold">Today's Task</h1>
                        <div className="flex flex-row gap-10">
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader 
                                    title="To Do" 
                                    count={todoTasks.length} 
                                    color="#FFC700" 
                                    onAddTask={addTask} 
                                    hoverColor="hover:bg-[#FFF9E3]" // Hover color for "To Do"
                                    activeColor="active:bg-[#FFF5D3]" // Active color for "To Do"
                                />
                                {todoTasks.map((task, index) => (
                                    <TaskCard key={index} {...task} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader 
                                    title="Work In Progress" 
                                    count={initialInProgressTasks.length} 
                                    color="#F55D76" 
                                    onAddTask={addTask} 
                                    hoverColor="hover:bg-[#FFEFF2]" // Hover color for "In Progress"
                                    activeColor="active:bg-[#FFDBE1]" // Active color for "In Progress"
                                />
                                {initialInProgressTasks.map((task, index) => (
                                    <TaskCard key={index} {...task} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-5 mt-5">
                                <SectionHeader 
                                    title="Completed" 
                                    count={initialCompletedTasks.length} 
                                    color="#FB0E9C" 
                                    onAddTask={addTask} 
                                    hoverColor="hover:bg-[#FFF2FA]" // Hover color for "Completed"
                                    activeColor="active:bg-[#FFDEF2]" // Active color for "Completed"
                                />
                                {initialCompletedTasks.map((task, index) => (
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
                        <div className="flex flex-col gap-3 w-full">
                            {Object.entries(groupedMeetings).map(([date, meetingsForDate]) => (
                                <div key={date} className="flex flex-col mt-3">
                                    <p className="text-lg text-[#2B2B2B] font-semibold">
                                        {getDateLabel(date)}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        {meetingsForDate.map((meeting, index) => (
                                            <MeetingCard key={index} {...meeting} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
