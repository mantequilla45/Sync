'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdSearch, IoIosArrowForward } from 'react-icons/io';
import HamburgerMenu from './side-bar';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsSharp, IoArrowBack } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import SearchInput from './search-bar';
import { GrNotification } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Head from 'next/head';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isSignUpPage = pathname === '/signup';
  const [isClicked, setIsClicked] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleCard = (cardType: string) => {
    setActiveCard((prevState) => (prevState === cardType ? null : cardType));
  };

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
      <header>
      <link
          href="https://fonts.googleapis.com/css?family=Poppins:wght@400;700;900&display=optional"
          rel="stylesheet"
        />
      </header>
      <div>
        <div
          className={`top-0 left-0 right-0 w-full ${isLanding ? 'bg-transparent text-white' : 'bg-transparent text-white'} py-4`}
          style={{ zIndex: 1000 }}
        >
          <div className={`flex items-center ${isLanding || isSignUpPage ? 'justify-center' : 'justify-between'} w-full`}>
            {!isLanding && !isSignUpPage && (
              <div className="flex flex-col items-center justify-between w-full mx-3">
                <div className="flex items-center w-full">
                  {/* Side bar icon */}
                  <HamburgerMenu />

                  {/* Sync icon and Search bar */}
                  <div className="flex items-center w-full ml-6">
                    <a href="/home" className="flex items-center">
                      <img 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e206a20408ef8878dcb5118bce850f8f290c84cbd09da22c62f468d88dfbdc15?placeholderIfAbsent=true&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f" 
                        alt="Description of the image"
                        className="w-[25px] h-[25px] "
                      />
                      <h1 className="text-2xl font-bold ml-[7px]">Sync</h1>
                    </a>
                    
                    <SearchInput
                      value={inputValue}
                      onChange={handleInputChange}
                      onClear={handleClearInput}
                      placeholder="Search Sync"
                      className="ml-4 max-w-xs"
                    />
                  </div>
                  <button
                    className="profile-button p-[11px] rounded-full bg-[#3D55B8] shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-gray-800 flex items-center justify-center mr-5 
                              hover:bg-[#4B67DD] hover:text-white 
                              active:bg-[#2C3E9A] active:scale-95 transition duration-200"
                  >
                    <GrNotification className="text-lg text-white" />
                  </button>

                  <button
                    className="profile-button p-2 rounded-full bg-white text-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center mr-16 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 active:scale-95 transition duration-200"
                    onClick={() => toggleCard('profile')}
                  >
                    <CgProfile className="text-2xl" />
                  </button>
                </div>

                {/* Profile Card */}
                {activeCard && (
                  <div ref={cardRef} className="relative w-full mx-4 mr-[180px]">
                    <div className="flex justify-end w-full">
                      <div
                        className={`absolute rounded-xl w-[13%] flex-col space-y-1 py-2 px-2 bg-gradient-to-tr from-[#3D50B5] to-[#82245C] mt-2 top-0 right-0 z-50 border border-[#4F1869] transition-all duration-300 ease-in-out ${
                          activeCard === 'profile' ? 'h-[217px]' : 'h-[120px]'
                        }`}
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }} // Added shadow for better visibility
                      >
                        {activeCard === 'profile' && (
                          <>
                            <a href="/account" className="flex flex-row w-full px-2 gap-3 hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2">
                              <div className="ml-[1px] w-auto">
                                <FaUser className="w-[20px] h-[20px] rounded-full" />
                              </div>
                              <h1 className="w-[80%] text-sm font-regular text-white">Account</h1>
                            </a>

                            <a href="/settings" className="flex flex-row w-full px-2 hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2">
                              <div>
                                <IoSettingsSharp className="w-[21px] h-[21px]" />
                              </div>
                              <h1 className="text-sm font-regular text-white ml-3">Settings</h1>
                            </a>
                            <a href="/settings" className="flex flex-row w-full px-2 hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2">
                              <div>
                                <IoSettingsSharp className="w-[21px] h-[21px]" />
                              </div>
                              <h1 className="text-sm font-regular text-white ml-3">Settings</h1>
                            </a>
                            
                            <a onClick={() => toggleCard('display')} className="flex flex-row w-full px-2 cursor-pointer hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2 justify-between">
                              <div className="flex flex-row items-center">
                                <div>
                                  <FaMoon className="w-[20px] h-[20px]" />
                                </div>
                                <h1 className="text-sm font-regular text-white ml-3">Display</h1>
                              </div>
                              <IoIosArrowForward />
                            </a>
                            <a className="flex flex-row w-full px-2 hover:bg-opacity-10 cursor-pointer hover:bg-white transition-all duration-300 rounded-lg items-center py-2"
                              onClick={logoutAndRedirect}
                            >
                              <div>
                                <TbLogout2 className="w-[21px] h-[21px]" />
                              </div>
                              <h1 className="text-sm font-regular text-white ml-3">Log Out</h1>
                            </a>
                          </>
                        )}
                        {activeCard === 'display' && (
                          <div className="flex flex-col">
                            <div className="flex flex-row w-full items-center">
                              <button onClick={() => toggleCard('profile')}
                                className="relative p-2 rounded-full transition-transform duration-300 transform hover:bg-white hover:bg-opacity-10"
                              >
                                <IoArrowBack className="text-xl" />
                              </button>
                              <h1 className="text-lg font-regular text-white ml-2">Display</h1>
                            </div>
                            <div className="flex flex-row w-full mx-auto space-x-4 justify-center mt-4 mb-4">
                              <button className="p-4 rounded-full bg-white border-2 border-[#C2C2C2]" />
                              <button className="p-4 rounded-full bg-[#313131] border-2 border-[#2D2D2D]" />
                              <button className="p-4 rounded-full bg-gradient-to-tr from-[#82245C] to-[#3D50B5] border-2 border-[#4F1869]" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {(isLanding || isSignUpPage) && (
              <>
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e206a20408ef8878dcb5118bce850f8f290c84cbd09da22c62f468d88dfbdc15?placeholderIfAbsent=true&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f" 
                  alt="Description of the image"
                  className="w-[25px] h-[25px]"
                />
                <h1 className="text-2xl font-bold ml-[7px]">{isSignUpPage ? 'Sync' : 'Sync'}</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function logoutAndRedirect() {
  try {
    // Send a POST request to the logout API route
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed', error);
  }
}

export default Header;