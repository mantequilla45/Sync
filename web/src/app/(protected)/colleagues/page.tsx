import ColleagueList from "@/components/protected/Colleagues/ColleagueList";
import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import { getColleagues } from "@/components/protected/Colleagues/ColleagueFunctions";
import { headers } from 'next/headers';
import Header from '@/components/protected/_Layout/header';

const ColleaguePage = async () => {
    const incomingHeaders = headers();

    const headersObject: Record<string, string> = {};
    incomingHeaders.forEach((value, key) => {
        headersObject[key] = value;
    });

    const data = await getColleagues(headersObject);

    // Check if colleagues data is available and handle the case where it might be null or undefined
    const colleagues = data?.colleagues ?? [];

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">Home / Colleagues</h1>
            </div>
            <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16">
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Colleagues</h1>
                    <div className="mt-10">
                        <ColleagueList colleagues={colleagues} />
                    </div>
                    <AddColleaguesForm />
                </div>
            </div>
        </div>
    );
}

export default ColleaguePage;
