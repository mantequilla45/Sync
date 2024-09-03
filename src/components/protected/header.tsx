'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdSearch } from "react-icons/io";
import HamburgerMenu from './hamburger-menu'; // Use the correct path based on your directory structure
import { CgProfile } from "react-icons/cg";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isSignUpPage = pathname === '/signup';
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);   // Reset after animation duration
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
              <HamburgerMenu />

              {/* Sync Text and Search Bar */}
              <div className="flex items-center w-full ml-6">
                <h1 className="text-2xl font-bold font-poppins">Sync</h1>

                <div className="relative w-full max-w-xs ml-4">
                  {/* Search Icon */}
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer transition-transform duration-300 ${isClicked ? 'translate-x-4' : ''}`}>
                    <IoMdSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Sync"
                    className="border border-gray-300 rounded-xl px-2 py-2 text-black text-sm pl-9 w-full"
                    onClick={handleClick}
                  />
                </div>
              </div>

              {/* Profile Icon */}
              <button className="p-2 rounded-full bg-white text-gray-800 flex items-center justify-center mr-16">
                <CgProfile className="text-2xl" />
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
