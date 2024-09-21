"use client";

import React, { useState } from 'react';
import Header from '../../../components/protected/header';
import DynamicCards from '../../../components/protected/dynamic-cards';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // To control the visibility of the modal

  const handleCloseModal = () => setIsModalOpen(false);
  const [isFocused, setIsFocused] = useState(false);

  const openModal = () => {
    setIsVisible(true); // Make modal visible
    setTimeout(() => {
        setIsModalOpen(true); // Start the transition after it's visible
    }, 10); // Small delay to ensure visibility before transition
};

// Function to close the modal
const closeModal = () => {
    setIsModalOpen(false); // Start the closing transition
    setTimeout(() => {
        setIsVisible(false); // Hide the modal after transition
    }, 300); // Delay matches the duration of the transition (300ms)
};

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header /> 
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home</h1>
      </div>
      <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16">
        <div>
          <h1 className="text-2xl text-[#2B2B2B] font-semibold">Welcome to Sync</h1>
        </div>
        
        <div className="border-b border-gray-300 my-10 mx-6 flex justify-between items-center">
          <h2 className="text-xl text-[#2B2B2B] font-regular my-5">Your Projects</h2>
          <div>
            <button 
              className="w-[150px] h-[45px] bg-[#69369B] rounded-full text-white text-md font-regular hover:bg-[#491C75] active:scale-95 active:bg-[#3B1363] transition-all duration-300"
              onClick={openModal} 
            >
              New Project
            </button>
          </div>
        </div>

        {/* Number of projects */}
        <DynamicCards cardCount={10} />

        {/* Modal for creating a new project */}
        {isVisible && (
          <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
                          transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white rounded-3xl p-10 w-1/3 transition-transform duration-300
                            ${isModalOpen ? 'translate-y-0' : '-translate-y-10'}`}>
              <h2 className="text-2xl text-[#652D90] font-semibold mb-4">Create New Project</h2>

              {/* Project Name */}
              <div className="mb-4 space-y-2">
                <div className="flex flex-row">
                  <label className="block text-gray-700">Project Name</label>
                  <label className="block text-[#F55F5F] ml-1">*</label>
                </div>
                <input 
                  type="text" 
                  className={`w-full bg-[#EDEDED] rounded-full p-2 pl-5 
                              border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`} 
                  placeholder="Enter project name" 
                  style={{ color: '#242424' }} 
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>

              {/* Project Description */}
              <div className="mb-4 space-y-2">
                <label className="block text-gray-700">Project Description</label>
                <textarea 
                  className={`w-full bg-[#EDEDED] text rounded-2xl p-4 pl-5 
                              border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`} 
                  rows={4} 
                  placeholder="Enter project description" 
                  style={{ color: '#242424' }}
                ></textarea>
              </div>

              {/* Add Collaborators */}
              <div className="mb-4">
                <label className="block text-gray-700">Add Collaborators</label>
                <input 
                  type="text" 
                  className={`w-full mt-2 bg-[#EDEDED] text rounded-full p-2 pl-5 
                              border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`} 
                  placeholder="Enter email or username" 
                  style={{ color: '#242424' }}
                />
                <button className="mt-4 bg-[#69369B] rounded-full text-white px-8 py-2">Invite</button>
              </div>

              {/* Privacy Settings */}
              <div className="mb-4">
                <label className="block text-[#2B2B2B]">Privacy Settings</label>
                <div className="flex items-center space-x-4 mt-4">
                  <label className="text-[#2B2B2B] flex items-center">
                    <input 
                      type="radio" 
                      name="privacy" 
                      value="private" 
                      className="mr-2 h-5 w-5"
                    />
                    Private
                  </label>
                  <label className="text-[#2B2B2B] flex items-center">
                    <input 
                      type="radio" 
                      name="privacy" 
                      value="public" 
                      className="mr-2 h-5 w-5"
                    />
                    Public
                  </label>
                </div>
              </div>

              {/* Submit/Cancel Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  className="bg-[#7E7E7E] text-white rounded-full px-8 py-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#69369B] rounded-full px-8 py-2"
                  onClick={() => window.location.href = '/document'}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
