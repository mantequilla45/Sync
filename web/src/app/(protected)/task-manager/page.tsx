"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/protected/_Layout/header';
import TaskCard from '@/components/protected/taskmanagers/task-cards';
import SectionHeader from '@/components/protected/taskmanagers/section-header';
import AddTaskButton from '@/components/protected/taskmanagers/addTask';
import { db } from '@/lib/Firebase/FirebaseClient';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/services/Auth/AuthContext';
import MeetingCards from '@/components/protected/taskmanagers/meeting-cards'; 


interface Task {
    id: string;
    userId: string;
    title: string;
    phase: string;
    status: string;
    dateRange: string;
    daysLeft: string;
    color: string;
}

interface Meeting {
    time: string;
    name: string;
    color: string;
    date: string; // Date string in "YYYY-MM-DD" format
}

export default function TaskManager() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);

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

    useEffect(() => {
        const exampleMeetings: Meeting[] = [
            { time: "8:00AM - 9:30AM", name: "Meeting #1", color: "#74365B", date: "2024-10-26" },
            { time: "10:00AM - 11:30AM", name: "Meeting #2", color: "#5A3E91", date: "2024-10-27" },
            { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-28" },
            { time: "3:00PM - 4:30PM", name: "Meeting #4", color: "#228B22", date: "2024-10-26" },
        ];
        setMeetings(exampleMeetings);
    }, []);

    const addTask = async (newTaskData: Omit<Task, 'id' | 'userId'>) => {
        if (!user) return;
        await addDoc(collection(db, "tasks"), { ...newTaskData, userId: user.uid });
    };

    const updateTaskStatus = async (taskId: string, updatedStatus: string) => {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, { status: updatedStatus });
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: updatedStatus } : task
            )
        );
    };

    const deleteTask = async (taskId: string) => {
        const taskRef = doc(db, "tasks", taskId);
        await deleteDoc(taskRef);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
                                            <TaskCard 
                                                key={index} 
                                                {...task} 
                                                onUpdateTask={updateTaskStatus}    
                                                onDeleteTask={deleteTask}
                                            />
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
                        <MeetingCards meetings={meetings} />
                    </div>
                </div>
            </div>
        </div>
    );
}
