"use client"; // Ensure this is a client-side component

import React, { useState } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Handle modal visibility
  React.useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsModalOpen(true), 10); // Delay to trigger transition
    } else {
      setIsModalOpen(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsModalOpen(false); // Trigger closing transition
    setTimeout(onClose, 300); // Wait for the transition to complete before unmounting
  };

  return isVisible ? (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
        transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white rounded-3xl p-10 w-1/3 transition-transform duration-300
          ${isModalOpen ? 'translate-y-0' : '-translate-y-10'}`}
      >
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
              <input type="radio" name="privacy" value="private" className="mr-2 h-5 w-5" />
              Private
            </label>
            <label className="text-[#2B2B2B] flex items-center">
              <input type="radio" name="privacy" value="public" className="mr-2 h-5 w-5" />
              Public
            </label>
          </div>
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-[#7E7E7E] text-white rounded-full px-8 py-2"
            onClick={handleClose} // Use handleClose to trigger the smooth close
          >
            Cancel
          </button>
          <button className="bg-[#69369B] rounded-full px-8 py-2">
            Create Project
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
