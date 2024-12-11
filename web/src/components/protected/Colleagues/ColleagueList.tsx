"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

// Define the Colleague interface
interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
}

// Define the prop type for ColleagueList
interface ColleagueListProps {
    colleagues: Colleague[];
}

const ColleagueList: React.FC<ColleagueListProps> = ({ colleagues }) => {
    // Track the selected colleague
    const [selectedColleague, setSelectedColleague] = useState<string | null>(null);

    // Handle card click to toggle the selected state
    const handleCardClick = (uid: string) => {
        if (selectedColleague === uid) {
            setSelectedColleague(null); // Deselect if clicked again
        } else {
            setSelectedColleague(uid);
        }
    };

    return (
        <div className="flex flex-col w-2/3">
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Colleague List</h2>
                <button
                    className="mr-3 p-2 hover:scale-110 active:scale-95 transition-transform duration-300 rounded-full bg-[#69369B]"
                    >
                    <FaPlus className="text-[20px] text-[#white]" />
                </button>
            </div>
            {/* Cards View */}
            <div className="flex flex-wrap gap-[30px] mt-7 text-[#2b2b2b]">
                {colleagues.map((colleague) => (
                    <div
                        key={colleague.uid}
                        className={`flex flex-col items-center p-10 w-48 rounded-xl shadow-md transition-all ease-in-out transform
                            ${selectedColleague === colleague.uid ? 'bg-[#DCDCDC] border-gray-300 scale-[.98]' : 'bg-[#FAFAFA] border-gray-100'}
                            ${selectedColleague === colleague.uid ? '' : 'hover:bg-[#EDEDED] hover:border-[#E1E1E1] hover:scale-[.99]'}
                            cursor-pointer border border-[#EEEEEE]`}
                        onClick={() => handleCardClick(colleague.uid)} // Handle click to toggle the selection state
                    >
                        <img
                            src={colleague.displayPicture}
                            alt={`${colleague.displayName}'s profile`}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <h3 className="text-md font-regular">{colleague.displayName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColleagueList;
