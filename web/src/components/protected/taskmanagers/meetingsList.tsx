import React, { useState } from 'react';
import MeetingCard, { Meeting } from './meeting-cards';
import { BsPlusCircle } from 'react-icons/bs';

const MeetingsList: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([
        { time: "8:00AM - 9:30AM", name: "Meeting #1", color: "#74365B", date: "2024-10-26" },
        { time: "10:00AM - 11:30AM", name: "Meeting #2", color: "#5A3E91", date: "2024-10-27" },
        { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-28" },
        { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-26" },
        { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-29" },
        { time: "1:00PM - 2:30PM", name: "Meeting #3", color: "#F55D76", date: "2024-10-28" },
    ]);

    // Function to add a new meeting
    const addMeeting = () => {
        const newMeeting: Meeting = {
            time: "3:00PM - 4:30PM",
            name: `Meeting #${meetings.length + 1}`,
            color: "#4CAF50",
            date: "2024-10-30",
        };
        setMeetings([...meetings, newMeeting]);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
                <button
                    onClick={addMeeting}
                    className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full"
                >
                    <BsPlusCircle className="mr-2" /> Add Meeting
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.name}
                        time={meeting.time}
                        name={meeting.name}
                        color={meeting.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default MeetingsList;
