"use client";
// TaskManager.tsx
import React, { useEffect, useState } from 'react';
import Header from '@/components/protected/_Layout/header';
import TaskCard from '@/components/protected/taskmanagers/task-cards';
import SectionHeader from '@/components/protected/taskmanagers/section-header';
import MeetingCard, {meetings, getDateLabel, groupMeetingsByDate}  from '@/components/protected/taskmanagers/meeting-cards';
import AddTaskButton from '@/components/protected/taskmanagers/addTask';
import { db } from '@/lib/Firebase/FirebaseClient';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/services/Auth/AuthContext';

const initialTodoTasks = [
    { id: 0, title: "Scale Marketing", phase: "4", dateRange: "24/10/24 - 2/11/24", daysLeft: 4, color: "#A228FF"},
    { id: 1, title: "Design Prototype", phase: "1", dateRange: "20/10/24 - 24/10/24", daysLeft: 0, color: "#FF5722"},
];

const initialInProgressTasks = [
    { id: 2, title: "Develop Product", phase: "3", dateRange: "20/10/24 - 25/10/24", daysLeft: 1, color: "#F55D76"},
];

const initialCompletedTasks = [
    { id: 3, title: "Market Research", phase: "2", dateRange: "15/10/24 - 19/10/24", daysLeft: 0, color: "#4CAF50"},
];

interface Task {
    userId: string;
    title: string;
    phase: string;
    status: string;
    dateRange: string;
    daysLeft: string;
    color: string;
}

export default function TaskManager() {
    const groupedMeetings = groupMeetingsByDate(meetings);
    
    //const [todoTasks, setTodoTasks] = useState(initialTodoTasks);
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);


    useEffect(() => {
        if (user) {
            const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    userId: doc.data().userId,
                    title: doc.data().title || "",
                    phase: doc.data().phase || "",
                    status: doc.data().status || "",
                    dateRange: doc.data().dateRange || "",
                    daysLeft: doc.data().daysLeft || "0",
                    color: doc.data().color || "#000000",
                }));
                setTasks(fetchedTasks);
            });
            return unsubscribe;
        }
    }, [user]);
    
    const addTask = async (newTaskData: Omit<Task, 'id' | 'userId'>) => {
        if (!user) return;
        await addDoc(collection(db, "tasks"), { ...newTaskData, userId: user.uid });
    }; 

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">
                    <a href="/home" className="text-white hover:text-gray-300">Home</a> / 
                    <span className="text-[#F6F61E] ml-1">Task Manager</span>
                </h1>
            </div>

            {/* Universal Add Task Button*/}

            {/* Task Sections */}
            <div className="flex-grow rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <div className="flex flex-row gap-14">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                        <AddTaskButton onAddTask={addTask} />   
                            <h1 className="text-2xl text-[#2B2B2B] font-semibold">Today{"'"}s Task</h1>  
                        </div>
                        <div className="flex flex-row gap-10">
                            {["To Do", "Work In Progress", "Completed"].map((status) => (
                                <div key={status} className="flex flex-col gap-5 mt-5">
                                    <SectionHeader 
                                        title={status} 
                                        count={tasks.filter((task) => task.status === status).length} 
                                        color={status === "To Do" ? "#FFC700" : status === "Work In Progress" ? "#F55D76" : "#FB0E9C"}
                                        onAddTask={addTask} 
                                    />
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task, index) => (
                                            <TaskCard key={index} {...task} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                <div className="flex flex-col w-1/3"> {/* Occupies 25% of the screen */}
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
