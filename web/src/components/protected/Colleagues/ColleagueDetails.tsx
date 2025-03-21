"use client";
import { useState } from "react";
import ColleagueList from "./ColleagueList";
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
            {/* Left Section */}
            <div className="w-2/3">
                <ColleagueList colleagues={colleagues} onCardClick={handleCardClick} />
            </div>

            {/* Right Section */}
            <div className="w-1/3 p-10 bg-[#FAFAFA] shadow-md rounded-xl border border-gray-200 flex justify-center items-center">
                {selectedColleague ? (
                    <div className="w-full text-center">
                        <div className="flex justify-center mb-4">
                            <Image
                                src={selectedColleague.displayPicture} // Dynamic source
                                alt="Profile Picture"
                                width={144} // 144px (w-36 in Tailwind)
                                height={144}
                                className="rounded-full object-cover border border-gray-300"
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
                    <div className="text-center text-[#2b2b2b] font-light text-sm">
                        <p>Select a colleague to view their profile</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColleagueDetails;
