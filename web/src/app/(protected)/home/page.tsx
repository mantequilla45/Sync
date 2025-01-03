import Header from '@/components/protected/_Layout/header';
import DynamicCardsLayout from '@/components/protected/Home/DynamicCards/dynamic-cards';
import ModalTrigger from '@/components/protected/Home/adddropdown';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">
                <a href="/home" className="text-white hover:text-gray-300">Home</a>
        </h1>
      </div>
      <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16">
      <div>
          <h1 className="text-2xl text-[#2B2B2B] font-semibold">Welcome to Sync</h1>
        </div>

        <div className="border-b border-gray-300 my-10 mx-6 flex justify-between items-center">
          <h2 className="text-xl text-[#2B2B2B] font-regular my-5">Your Projects</h2>
          <ModalTrigger />
        </div>
          <DynamicCardsLayout />
      </div>
    </div>
  );
}
