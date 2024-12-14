
import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import { getColleagues } from "@/components/protected/Colleagues/ColleagueFunctions";
import { headers } from "next/headers";
import Header from "@/components/protected/_Layout/header";
import ColleagueDetails from "@/components/protected/Colleagues/ColleagueDetails";

// Define the Colleague interface
interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    userTag: string;
    email: string;
    projectName: string;
}

const ColleaguePage = async () => {
    const incomingHeaders = headers();

    const headersObject: Record<string, string> = {};
    incomingHeaders.forEach((value, key) => {
        headersObject[key] = value;
    });

    const colleagueData = await getColleagues(headersObject);

    console.log(colleagueData)
    const colleagues: Colleague[] = colleagueData?.colleagues || [];

    console.log(colleagues);

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
                        <ColleagueDetails colleagues={colleagues} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColleaguePage;
