"use client";
import { useState } from "react";
import ColleagueList from "./ColleagueList";

// Define the Colleague interface
interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    userTag: string;
    email: string;
    projectName: string;
}

interface ColleagueDetailsProps {
    colleagues: Colleague[];
}

const ColleagueDetails = ({ colleagues }: ColleagueDetailsProps) => {
    const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

    const handleCardClick = (colleague: Colleague) => {
        setSelectedColleague(colleague);
    };

    return (
        <div className="flex mt-5">
            <div className="w-3/4">
                <ColleagueList colleagues={colleagues} onCardClick={handleCardClick} />
            </div>
            <div className="w-1/4 p-10 bg-[#FAFAFA] h-[660px] shadow-md rounded-xl border border-gray-200">
                {selectedColleague ? (
                    <div>
                        <div className="flex mb-4">
                            <img
                                src={selectedColleague.displayPicture}
                                alt="Profile Picture"
                                className="w-36 h-36 rounded-full object-cover border border-gray-300"
                            />
                        </div>
                        <div className="text-[#2b2b2b]">
                            <h2 className="text-xl font-semibold">{selectedColleague.displayName}</h2>
                            <p className="font-light text-sm">{selectedColleague.userTag}</p>
                            <p className="font-light text-sm">{selectedColleague.email}</p>
                            <p>
                                Colleague in <span className="font-semibold">{selectedColleague.projectName}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center font-light">Select a colleague to view profile</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColleagueDetails;