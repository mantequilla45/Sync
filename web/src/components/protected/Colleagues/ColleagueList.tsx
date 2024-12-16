"use client";
import React, { useState } from "react";
import Image from "next/image";

// Define the Colleague interface
interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    userTag: string;
    email: string;
    projectName: string;
}

// Define the prop type for ColleagueList
interface ColleagueListProps {
    colleagues: Colleague[];
    onCardClick: (colleague: Colleague) => void; // Add the callback function for card clicks
}

const ColleagueList: React.FC<ColleagueListProps> = ({ colleagues, onCardClick }) => {
    // Track the selected colleague
    const [selectedColleague, setSelectedColleague] = useState<string | null>(null);

    // Handle card click to toggle the selected state
    const handleCardClick = (colleague: Colleague) => {
        setSelectedColleague(colleague.uid);
        onCardClick(colleague); // Pass the colleague details to the parent component
    };

    return (
        <div className="flex flex-col text-[#2b2b2b]">
            <div className="flex flex-wrap gap-[30px] text-[#2b2b2b] cursor-pointer">
                {colleagues.map((colleague) => (
                    <div
                        key={colleague.uid}
                        className={`flex flex-col items-center p-10 w-46 rounded-xl shadow-md transition-all ease-in-out transform
                            ${selectedColleague === colleague.uid ? 'bg-[#DCDCDC] border border-gray-300 scale-[.98]' : 'bg-[#FAFAFA] border border-gray-200'}
                            ${selectedColleague === colleague.uid ? '' : 'hover:bg-[#EDEDED] hover:border-[#E1E1E1] hover:scale-[.99]'}`}
                        onClick={() => handleCardClick(colleague)}
                    >
                        <Image
                            src={colleague.displayPicture}
                            alt={`${colleague.displayName}'s profile`}
                            width={96}
                            height={96}
                            className="rounded-full object-cover mb-2"
                            />
                        <h3 className="text-md font-regular">{colleague.displayName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColleagueList;
