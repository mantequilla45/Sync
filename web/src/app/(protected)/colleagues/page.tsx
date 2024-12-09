import ColleagueList from "@/components/protected/Colleagues/ColleagueList";
import AddColleaguesForm from "@/components/protected/Colleagues/AddColleagueForm";
import { headers } from 'next/headers';
import Header from '@/components/protected/_Layout/header';

const ColleaguePage = async () => {
    const colleagues = [
        {
            uid: "1",
            displayName: "John Doe",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "2",
            displayName: "Jane Smith",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "3",
            displayName: "Alice Johnson",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "4",
            displayName: "Bob Brown",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "5",
            displayName: "Charlie Davis",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "6",
            displayName: "Eva Wilson",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "7",
            displayName: "David Lee",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "8",
            displayName: "Grace Moore",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "9",
            displayName: "Hannah Clark",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
        {
            uid: "10",
            displayName: "Jack White",
            displayPicture:
                "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301",
        },
    ];
    

    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            {/* Header */}
            <Header />

            {/* Breadcrumb Navigation */}
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">
                    <a href="/home" className="text-white hover:text-gray-300">Home</a> / 
                    <span className="text-[#F6F61E] ml-1">Colleagues</span>
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 mb-16 px-[150px] py-[70px]">
                {colleagues.length > 0 ? (
                    <ColleagueList colleagues={colleagues} />
                ) : (
                    <div className="text-center text-gray-600">
                        <h2>No colleagues found.</h2>
                    </div>
                )}

                {/* Optionally show Add Colleague Form */}
                <div className="mt-8">
                    {/* Uncomment the AddColleaguesForm when ready to allow adding colleagues */}
                    {/* <AddColleaguesForm /> */}
                </div>
            </div>
        </div>
    );
}

export default ColleaguePage;
