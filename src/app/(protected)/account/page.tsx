'use client';
import Header from '../../../components/protected/header';
import SearchInput from '../../../components/protected/search-bar';
import React, { useState, useEffect, useRef } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import verifySession from '@/app/lib/middleware/verifySession';
import { cookies } from 'next/headers'; // This helps you access cookies in Next.js 14
import { redirect } from 'next/navigation';

const ProfilePage = () => {

  //Some of this migrate to components
  const [, setIsClicked] = useState(false); 
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  //Please use components for client side actions (text editing) for in order to use API routes and not `use client` the page
  /*const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  // Verify session using your middleware
  const sessionResult = await verifySession(authToken);

  // If the session is invalid, redirect to the login page
  if (!sessionResult.success) {
    redirect('/'); // Or any other route
  }*/

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (cardRef.current && !cardRef.current.contains(target) && !target?.closest('.profile-button')) {
        setActiveCard(null);
      }
    };

    if (activeCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCard]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
    setIsClicked(false);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header />
        <div className="px-[90px] mb-2">
          <h1 className="text-sm text-white font-light">Home / Account</h1>
        </div>
        {/* Background container with opacity */}
        <div className="relative flex-grow mx-16 mb-16">
          <div className="absolute inset-0 bg-[#F6F6F6] rounded-2xl opacity-[35%] shadow-lg z-0"></div>
          <div className="relative flex flex-row space-x-8 px-8 py-8 z-10">
            {/* Card 1 */}
            <div className="flex-none rounded-xl py-2" style={{ width: '15%' }}>
              {/* Content of Card 1 */}

              <SearchInput
                value={inputValue}
                onChange={handleInputChange}
                onClear={handleClearInput}
                placeholder="Search Info"
                className="max-w-full "
              />

              
              <hr className="my-4 w-full border-[#685C5C] opacity-[65%]" />

              <div className="space-y-6 font-regular mt-6 text-3xl text-[#222726] ">
                <div className="flex flex-rows items-center space-x-3">
                  <MdAccountCircle />
                  <h2 className="text-lg ">Basic Information</h2>
                </div>
                <div className="flex flex-rows items-center space-x-3">
                  <IoIosNotifications />
                  <h2 className="text-lg ">Notification</h2>
                </div>
                <div className="flex flex-rows items-center space-x-3">
                  <MdOutlineSecurity />
                  <h2 className="text-lg ">Password and Security</h2>
                </div>
                <div className="flex flex-rows items-center space-x-3">
                  <MdDelete />
                  <h2 className="text-lg ">Delete Account</h2>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-1 flex-col space-y-5">
              
              <div className="flex-1 bg-white rounded-xl shadow-md px-5 py-10">
                <div className="px-10">
                  <div className="flex flex-row items-center">
                    <div className="w-[200px] h-[200px] bg-[#D9D9D9] rounded-full"/>
                    <div className="flex flex-col ml-10 ">
                      <h2 className="text-3xl text-[#8543C6] font-extrabold">Profile Photo</h2>
                      <h2 className="text-sm text-[#888787] font-light">This will be displayed on your profile</h2>
                    </div>
                  </div>
                </div>
                
                <div className="w-[20%] flex justify-center">
                  <h2 className="text-xl text-[#8543C6] font-bold">Name</h2>
                  <textarea
                    placeholder="Enter your name"
                    className="mt-2 p-2 border text-black border-gray-300 rounded-full w-full h-[50px] resize-none"
                  />
                </div>

              </div>

              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <h2 className="text-2xl text-[#8543C6] font-semibold mb-4">Notification</h2>
                <p className="text-gray-700">This is some content inside the second card.</p>
              </div>

              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <h2 className="text-2xl text-[#8543C6] font-semibold mb-4">Password and Security</h2>
                <p className="text-gray-700">This is some content inside the second card.</p>
              </div>
              
              <div className="flex-1 bg-white rounded-xl shadow-md p-5">
                <h2 className="text-2xl text-[#8543C6] font-semibold mb-4">Delete Account</h2>
                <p className="text-gray-700">This is some content inside the second card.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
