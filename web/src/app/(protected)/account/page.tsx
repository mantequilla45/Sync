'use client';
import Header from '../../../components/protected/header';
import SearchInput from '../../../components/protected/search-bar';
import React, { useState, useEffect, useRef } from 'react';
import { MdAccountCircle, MdAlternateEmail, MdEdit, MdOutlineSecurity, MdDelete } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import { FaUserLarge } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
  const [isClick, setIsClicked] = useState(false); 
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
    setIsClicked(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home / Account</h1>
      </div>
      <div className="relative flex justify-center mx-16 mb-16">
        <div className="absolute inset-0 bg-[#FFFFFF] rounded-2xl opacity-[35%] w-[75%] mx-auto shadow-lg z-0" />
        <div className="relative flex flex-row space-x-8 px-8 w-[75%] py-8 z-10">
          <div className="flex-none rounded-xl py-2" style={{ width: '25%' }}>
            <SearchInput
              value={inputValue}
              onChange={handleInputChange}
              onClear={handleClearInput}
              placeholder="Search Info"
              className="max-w-full"
            />
            <hr className="my-4 w-full border-[#685C5C] opacity-[65%]" />
            <div className="space-y-6 font-regular mt-6 text-3xl text-[#222726]">
              <div className="flex flex-rows items-center space-x-3">
                <MdAccountCircle />
                <h2 className="text-lg">Basic Information</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <IoIosNotifications />
                <h2 className="text-lg">Notification</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <MdOutlineSecurity />
                <h2 className="text-lg">Password and Security</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <MdDelete />
                <h2 className="text-lg">Delete Account</h2>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col space-y-5">
            <div className="flex-1 bg-white rounded-xl shadow-md p-[40px] relative">
              <div className="flex flex-row">
                <div className="flex flex-col items-center">
                  {/* Profile Picture */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-[200px] h-[200px] bg-[#D9D9D9] border-[2px] border-[#926AB2] rounded-full relative">
                      <div className="absolute inset-0 overflow-hidden rounded-full">
                        <img
                          src="https://scontent.fcgy2-4.fna.fbcdn.net/v/t1.15752-9/457702536_1711177819726738_5482151751262735168_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFfAGFplnQ32wGkj89pS3By0VcBCJN0BRvRVwEIk3QFG46P2QCfLoHUJaAX2azceDgXuFILo04_QMH4Q0Tg-3fn&_nc_ohc=WO2LOI1UFk8Q7kNvgFOPXEg&_nc_ht=scontent.fcgy2-4.fna&oh=03_Q7cD1QE5RoHILdtcX2EdS4nu485A-cBfr_QeLI4YfqWKhP48lA&oe=67051E50"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-gradient-to-t from-[#A01887] via-[#C047DD] to-[#94C3E6] border-[1px] border-[#7F2CBF] flex justify-center items-center focus:outline-none z-10">
                          <MdEdit className="text-black w-6 h-6" />
                        </button>
                      </div>
                      <h2 className="text-md text-[#888787] font-light mt-[15px]">#hakdog</h2>
                    </div>
                  </div>
                  <div className="flex flex-col ml-10 h-[200px] justify-center">
                    <h2 className="text-3xl text-[#69369B] font-extrabold">Profile Photo</h2>
                    <h2 className="text-sm text-[#888787]">This will be displayed on your profile</h2>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row mt-6 gap-[25px] px-7">
                <div className="flex w-[50%] flex-col">
                  <h2 className="text-xl text-[#69369B] font-bold mb-3 ml-[10px]">Name</h2>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <FaUserLarge className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-black rounded-full" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full pl-2 pl-[50px] pr-[25px] py-4 bg-[#F4F4F4] text-[#626262] border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#69369B]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-[50%] flex-col">
                  <h2 className="text-xl text-[#69369B] font-bold mb-3 ml-[10px]">Email</h2>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <MdAlternateEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-black rounded-full" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-2 pl-[50px] pr-[25px] py-4 bg-[#F4F4F4] text-[#626262] border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#69369B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-end w-full mt-10 px-7">
                <button
                  className="flex justify-center w-[70px] h-[50px] items-center px-4 py-3 bg-[#00cc9a] text-white rounded-md shadow-md hover:bg-[#009e74] transition duration-200"
                >
                  <FaEdit className="ml-[3px] mb-[2px] text-xl" />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-5">
              <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Notification</h2>
              <p className="text-gray-700">This is some content inside the second card.</p>
            </div>

            {/* Password and Security */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-5">
              <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Password and Security</h2>
              <p className="text-gray-700">This is some content inside the second card.</p>
            </div>

            {/* Account Deletion */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-5">
              <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Delete Account</h2>
              <p className="text-gray-700">This is some content inside the second card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;