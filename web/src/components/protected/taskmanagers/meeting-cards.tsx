// MeetingCard.tsx
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

export interface Meeting {
    time: string;
    name: string;
    color: string;
    date: string; // Date string in "YYYY-MM-DD" format
}

// Sample meeting data
export const meetings: Meeting[] = [
    { time: "8:00AM - 9:30AM", name: "Meeting #1", color: "#74365B", date: "2024-10-26" },
    { time: "10:00AM - 11:30AM", name: "Meeting #2", color: "#5A3E91", date: "2024-10-27" },
    { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-28" },
    { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-26" },
    { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-29" },
    { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-28" },
];

// Function to check if a date is "Today" or "Tomorrow"
export const getDateLabel = (date: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const meetingDate = new Date(date);
    if (meetingDate.toDateString() === today.toDateString()) return "Today";
    if (meetingDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return meetingDate.toLocaleDateString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric',
    });
};

// Helper to group meetings by date
export const groupMeetingsByDate = (meetings: Meeting[]) => {
    return meetings.reduce((acc, meeting) => {
        if (!acc[meeting.date]) {
            acc[meeting.date] = [];
        }
        acc[meeting.date].push(meeting);
        return acc;
    }, {} as Record<string, Meeting[]>);
};

// MeetingCard component
interface MeetingCardProps {
    time: string;
    name: string;
    color: string;
}

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

export default MeetingCard;
