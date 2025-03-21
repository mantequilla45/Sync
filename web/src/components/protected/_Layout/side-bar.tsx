'use client';

import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { BiSolidNotepad } from "react-icons/bi";
import { FaDiagramProject } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import Image from 'next/image';


const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu} 
        className="p-2 flex items-center justify-center rounded-full hover:bg-opacity-10 hover:bg-white transition-all duration-300"
      >
        <RxHamburgerMenu className="text-2xl" />
      </button>

      {/* Sliding Banner */}
      <div
        className={`fixed top-0 left-0 h-full w-64 text-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-[linear-gradient(to_bottom,_#75277E,_#81245D,_#82245C)]`}
        style={{ zIndex: 999 }}
      >
        {/* Close Button inside the menu */}
        <div className="flex items-center w-auto py-2 h-[62px] mx-3.5 gap-2">
          <button 
            onClick={toggleMenu} 
            className="p-2 flex items-center justify-center rounded-full hover:bg-opacity-10 hover:bg-white transition-all duration-300"
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>
          <a href="/home" className="flex items-center">
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99"
                        alt="Logo"
                        width = {25}
                        height = {25}
                      />
                      <h1 className="text-2xl font-bold ml-[7px]">Sync</h1>
                    </a>
          <div className="w-[100%] bg-transparent h-[38px] flex items-center justify-center"></div>
        </div>
        <div className="p-4 flex flex-col justify-between h-[879px]">
          {/* Add your menu items here */}
          <div className="space-y-1">
            <a href="/home" className="py-2 px-2.5 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <HiMiniHome className="text-2xl" />
                <div className="block mx-4 ">Home</div>
            </a>
            <a href="/task-manager" className="py-2 px-2.5 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <BiSolidNotepad className="text-2xl" />
                <div className="block mx-4">Task Manager</div>
            </a>
            <a href="/home" className="py-2 px-2.5 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
              <FaDiagramProject className="text-2xl" />
                <div className="block mx-4">Your Projects</div>
            </a>
            <a href="/colleagues" className="py-2 px-2.5 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
              <FaUserFriends className="text-2xl" />
                <div className="block mx-4">Colleagues</div>
            </a>
          </div>
          <div className="space-y-1 text-sm">
            <a href="/about" className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300 ">
              <IoIosInformationCircle className="text-xl" />
              <div className="block mx-4">About</div>
            </a>
            <a href="/contact-us" className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
              <IoMail className="text-xl" />
              <div className="block mx-4">Contact Us</div>
            </a>
            <a href="/about-us" className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
              <FaUsers className="text-xl" />
              <div className="block mx-4">Our Team</div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay for closing the banner */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
        style={{ zIndex: 998 }}
      />
    </>
  );
};

export default HamburgerMenu;