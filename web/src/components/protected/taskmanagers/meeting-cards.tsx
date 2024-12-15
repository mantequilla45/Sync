"use client";

import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

export interface Meeting {
    time: string;
    name: string;
    color: string;
    date: string; // Date string in "YYYY-MM-DD" format
}

// Function to group meetings by date
const groupMeetingsByDate = (meetings: Meeting[]) => {
    return meetings.reduce((acc, meeting) => {
        if (!acc[meeting.date]) {
            acc[meeting.date] = [];
        }
        acc[meeting.date].push(meeting);
        return acc;
    }, {} as Record<string, Meeting[]>);
};

// Function to check if a date is "Today" or "Tomorrow"
const getDateLabel = (date: string) => {
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

const MeetingCard: React.FC<Meeting> = ({ time, name, color }) => (
    <div style={{ backgroundColor: color }} className="h-auto rounded-xl px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition-all duration-200">
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

interface MeetingCardsProps {
    meetings: Meeting[];
}

const MeetingCards: React.FC<MeetingCardsProps> = ({ meetings }) => {
    const groupedMeetings = groupMeetingsByDate(meetings);

    return (
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
    );
};

export default MeetingCards;
