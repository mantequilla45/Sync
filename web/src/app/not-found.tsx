import { Header } from '@/components/_index';
import { IoReturnDownBackOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      
        <div className="flex flex-grow bg-white gap-5 text-[#2b2b2b] shadow-lg w-full flex-row p-[100px] justify-center">
          <div className="flex flex-col py-[60px]">
            <h1 className="text-[70px] font-semibold">
            So Sorry!
            </h1>
            <p className="text-3xl">
              Sorry, the page you’re looking for doesn’t exist.
            </p>

            <p className="text-xl mt-7 mb-4">
              Possible Reasons:
            </p>
            <ul className="text-lg space-y-3 ml-5">
              <li className="flex items-center gap-2">
              <FaCircle className="w-[10px] h-[10px]" />
                The address may have been typed incorrectly.
              </li>
              <li className="flex items-center gap-2">
                <FaCircle className="w-[10px] h-[10px]" />
                It may be a broken or outdated link.
              </li>
            </ul>
            <div className="flex flex-row gap-7 mt-[30px]">
              <a
                href="/"
                className="mt-6 px-8 py-3 bg-[#69369B] text-white text-lg font-regular rounded-2xl hover:bg-[#572A81] hover:shadow-lg transition duration-300"
              >
                Back to Home
              </a>
              <a
                href="/contact-us"
                className="mt-6 px-8 py-3 text-[#2b2b2b] text-lg font-regular rounded-2xl border border-gray-300 hover:border-gray-500 transition duration-300"
              >
                Contact Us
              </a>
            </div>

            
          </div>
          <div className="flex items-center">
            <img
              src="/svgs/NotFound.svg"
              alt="404 Not Found"
              className="w-[650px] h-[650px]"
            />

          </div>
      </div>
    </div>
  );
}
