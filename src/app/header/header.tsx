'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdSearch } from "react-icons/io";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isSignUpPage = pathname === '/signup';
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Reset after animation duration
  };

  return (
    <div
      className={`top-0 left-0 right-0 w-full ${isLanding ? 'bg-transparent text-white' : 'bg-transparent text-white'} py-4`}
      style={{ zIndex: 1000 }}
    >
      <div className={`flex items-center ${isLanding || isSignUpPage ? 'justify-center' : 'justify-between'} w-full`}>

        {!isLanding && !isSignUpPage && (
          <div className="flex items-center justify-between w-full mx-3">
            <div className="flex items-center w-full">
              {/* Hamburger Menu */}
              <button className="p-2 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Sync Text and Search Bar */}
              <div className="flex items-center w-full ml-6">
                <h1 className="text-2xl font-bold font-poppins">Sync</h1>
                
                <div className="relative w-full max-w-xs ml-4">
                  <IoMdSearch
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer transition-transform duration-300 ${isClicked ? 'translate-x-4' : ''}`}
                    onClick={handleClick}
                  />
                  <input
                    type="text"
                    placeholder="Search Sync"
                    className="border border-gray-300 rounded-xl px-2 py-2 text-black text-sm pl-7 w-full"
                  />
                </div>
              </div>

              {/* Profile Icon */}
              <button className="p-4 rounded-full bg-white text-gray-800 flex items-center justify-center mr-16">
                {/* Add your profile icon SVG or image here */}
              </button>
            </div>
          </div>
        )}

        {(isLanding || isSignUpPage) && (
          <h1 className="text-2xl font-bold font-poppins">{isSignUpPage ? 'Sync' : 'Sync'}</h1>
        )}
      </div>
    </div>
  );
};

export default Header;
