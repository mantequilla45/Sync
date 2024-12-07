"use client"; 
import React, { useState } from "react";

interface DocumentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsModalOpen(true), 10); // Delay for transition effect
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
        transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded-3xl p-10 w-1/3 transition-transform duration-300
          ${isModalOpen ? "translate-y-0" : "-translate-y-10"}`}
      >
        <h2 className="text-2xl text-[#652D90] font-semibold mb-4">Create New Document</h2>

        {/* Document Title */}
        <div className="mb-4 space-y-2">
          <div className="flex flex-row">
            <label className="block text-gray-700">Document Title</label>
            <label className="block text-[#F55F5F] ml-1">*</label>
          </div>
          <input
            type="text"
            className={`w-full bg-[#EDEDED] rounded-full p-2 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            placeholder="Enter document title"
            style={{ color: "#242424" }}
          />
        </div>

        {/* Document Content */}
        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">Document Content</label>
          <textarea
            className={`w-full bg-[#EDEDED] rounded-2xl p-4 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            rows={6}
            placeholder="Write your content here"
            style={{ color: "#242424" }}
          ></textarea>
        </div>
        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-[#7E7E7E] text-white rounded-full px-8 py-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="bg-[#69369B] rounded-full px-8 py-2">
            Create Document
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DocumentModal;
