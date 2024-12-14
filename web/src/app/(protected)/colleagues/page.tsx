"use client";
import { useState, useEffect } from "react";
import ColleagueList from "@/components/protected/Colleagues/ColleagueList";
import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import Header from '@/components/protected/_Layout/header';

// Define the Colleague interface
interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    userTag: string;
    email: string;
    projectName: string;
}

const ColleaguePage = () => {
    const [colleagues, setColleagues] = useState<Colleague[]>([]);
    const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

    // Fetch colleagues (or set static data as you have)
    useEffect(() => {
        // Simulating an async API call for colleagues
        const fetchedColleagues = [
            {
                uid: "1",
                displayName: "John Doe",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@johndoe",
                email: "johndoe@example.com",
                projectName: "Project X"
            },
            {
                uid: "2",
                displayName: "Jane Smith",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@janesmith",
                email: "janesmith@example.com",
                projectName: "Project Y"
            },
            {
                uid: "3",
                displayName: "Alice Johnson",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@alicejohnson",
                email: "alicejohnson@example.com",
                projectName: "Project Z"
            },
            {
                uid: "4",
                displayName: "Bob Brown",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@bobbrown",
                email: "bobbrown@example.com",
                projectName: "Project A"
            },
            {
                uid: "5",
                displayName: "Charlie Davis",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@charliedavis",
                email: "charliedavis@example.com",
                projectName: "Project B"
            },
            {
                uid: "6",
                displayName: "Eva Wilson",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@evawilson",
                email: "evawilson@example.com",
                projectName: "Project C"
            },
            {
                uid: "7",
                displayName: "David Lee",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@davidlee",
                email: "davidlee@example.com",
                projectName: "Project D"
            },
            {
                uid: "8",
                displayName: "Grace Moore",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@gracemoore",
                email: "gracemoore@example.com",
                projectName: "Project E"
            },
            {
                uid: "9",
                displayName: "Hannah Clark",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@hannahclark",
                email: "hannahclark@example.com",
                projectName: "Project F"
            },
            {
                uid: "10",
                displayName: "Jack White",
                displayPicture:
                    "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
                userTag: "@jackwhite",
                email: "jackwhite@example.com",
                projectName: "Project G"
            },
        ];
        
        
        setColleagues(fetchedColleagues);
    }, []); // Empty dependency array to run once when the component mounts

    const handleCardClick = (colleague: Colleague) => {
        setSelectedColleague(colleague);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">
                    <a href="/home" className="text-white hover:text-gray-300">Home</a> / 
                    <span className="text-[#F6F61E] ml-1">Colleagues</span>
                </h1>
            </div>
            <div className="flex flex-row rounded-2xl shadow-lg mx-16 gap-[50px] mb-16 bg-white px-[150px] py-[70px]">
                <div className="w-3/4">
                    <AddColleaguesForm />
                    <h2 className="text-[#2b2b2b]">Your Colleagues</h2>
                    {colleagues.length === 0 ? (
                        <div className="flex h-full justify-center items-center">
                            <img
                                src="/gifs/loading.gif"
                                alt="Loading..."
                                className="w-40 h-40 mt-[-250px]"
                            />
                        </div>
                    ) : (
                        <ColleagueList colleagues={colleagues} onCardClick={handleCardClick} />
                    )}
                </div>
                <div className="w-1/4 p-10 bg-[#FAFAFA] h-[660px] shadow-md rounded-xl border border-gray-200">
                    {selectedColleague ? (
                        <div>
                            <div className="flex mb-4">
                                <img
                                    src={selectedColleague.displayPicture}
                                    alt="Profile Picture"
                                    className="w-36 h-36 rounded-full object-cover border border-1 border-gray-300"
                                />
                            </div>
                            <div className="text-[#2b2b2b]">
                                <h2 className="text-xl font-semibold text-gray-800">{selectedColleague.displayName}</h2>
                                <p className="font-light text-sm">{selectedColleague.userTag}</p>
                                <p className="font-light text-sm">{selectedColleague.email}</p>
                                <p className="mt-2">
                                    Colleague in <span className="text-[#521E7A] font-semibold">{selectedColleague.projectName}</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-center font-light text-[#2b2b2b]">Select a colleague to view profile</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColleaguePage;
