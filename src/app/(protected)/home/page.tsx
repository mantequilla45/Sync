import Link from 'next/link';
import Header from '../../../../components/(protected)/header';
import DynamicCards from '../../../../components/(protected)/dynamic-cards'; // Adjust the path as needed

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16">
        <div>
          <h1 className="text-2xl text-[#2B2B2B] font-regular font-poppins">Welcome to Sync</h1>
        </div>
        
        <div>
          <h2 className="text-xl text-[#2B2B2B] font-regular font-poppins my-10 mx-6">Your Projects</h2>
        </div>
        
        {/* Number of projects */}
        <DynamicCards cardCount={20} />
      </div>
    </div>
  );
}
