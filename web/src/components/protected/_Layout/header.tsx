// components/Header.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import HamburgerMenu from './side-bar';
import SearchInput from './search-bar';
import ProfileCard from './profilecard';  // Import ProfileCard component
import { GoBellFill } from "react-icons/go";

// NotificationWall Component
interface NotificationWallProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationWall: React.FC<NotificationWallProps> = ({ isOpen, onClose }) => {
  const wallRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);  // Declare bellRef here

  // Close the notification wall if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wallRef.current && !wallRef.current.contains(event.target as Node) &&
        bellRef.current && !bellRef.current.contains(event.target as Node)
      ) {
        onClose();  // Close wall when clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={wallRef}
      className={`absolute top-[60px] right-[150px] w-[300px] bg-white shadow-lg rounded-lg border border-gray-300 z-50 text-[#2b2b2b] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-[200px] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
          <span className="text-sm text-gray-600">New message from John</span>
          <button className="text-blue-500 text-sm">View</button>
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
          <span className="text-sm text-gray-600">Your task is due tomorrow</span>
          <button className="text-blue-500 text-sm">View</button>
        </div>
      </div>
      <button
        className="w-full text-center text-sm text-gray-500 py-2 hover:bg-gray-100 rounded-b-lg"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isSignUpPage = pathname === '/signup';
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (cardType: string) => {
    setActiveCard((prevState) => (prevState === cardType ? null : cardType));
  };

  const logoutAndRedirect = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const bellRef = useRef<HTMLButtonElement>(null);  // Define bellRef here

  return (
    <header>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <div className={`top-0 left-0 right-0 w-full ${isLanding ? 'bg-transparent text-white' : 'bg-transparent text-white'}`} style={{ zIndex: 1000 }}>
        <div className={`flex items-center ${isLanding || isSignUpPage ? 'justify-center' : 'justify-between'} w-full`}>
          {!isLanding && !isSignUpPage && (
            <div className="flex flex-col items-center justify-between w-full mx-3 py-2">
              <div className="flex items-center w-full">
                <HamburgerMenu />
                <div className="flex items-center w-full ml-6">
                  <a href="/home" className="flex items-center">
                    <img src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99" alt="Logo" className="w-[25px] h-[25px]" />
                    <h1 className="text-2xl font-semibold ml-[7px]">Sync</h1>
                  </a>
                  <SearchInput value={inputValue} onChange={handleInputChange} onClear={handleClearInput} placeholder="Search Sync" className="ml-4 max-w-xs mx-10 text-white" />
                </div>
                <div className="flex flex-row m-1 items-center justify-center">
                  <button
                    ref={bellRef}  // Attach ref to the bell icon
                    className="profile-button p-2 rounded-full bg-[#3D55B8] shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-gray-800 flex items-center justify-center mr-5 hover:bg-[#4B67DD] hover:text-white active:bg-[#2C3E9A] active:scale-95 transition duration-200"
                    onClick={handleToggle} // Toggle on bell icon click
                  >
                    <GoBellFill className="text-lg text-white w-[20px] h-[20px]" />
                  </button>

                  {/* Notification wall */}
                  <NotificationWall isOpen={isOpen} onClose={() => setIsOpen(false)} />

                  <button
                    className="profile-button w-[36px] h-[36px] rounded-full bg-white text-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center mr-16 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 active:scale-95 transition duration-200 overflow-hidden"
                    onClick={() => toggleCard('profile')}
                  >
                    <img src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301" alt="Profile" className="w-[36px] h-[36px] rounded-full object-cover" />
                  </button>
                </div>
              </div>
              <ProfileCard activeCard={activeCard} toggleCard={toggleCard} logoutAndRedirect={logoutAndRedirect} />
            </div>
          )}
          {(isLanding || isSignUpPage) && (
            <>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e206a20408ef8878dcb5118bce850f8f290c84cbd09da22c62f468d88dfbdc15?placeholderIfAbsent=true&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f" alt="Logo" className="w-[25px] h-[25px]" />
              <h1 className="text-2xl font-bold ml-[7px]">{isSignUpPage ? 'Sync' : 'Sync'}</h1>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
