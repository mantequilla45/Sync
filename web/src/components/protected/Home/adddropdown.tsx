"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/protected/Home/newprojectModal"; // For Project
import DocumentModal from "@/components/protected/Home/adddocumentModal"; // For Document
import { IoIosArrowDown } from "react-icons/io";

export default function DropdownTrigger() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Properly typing the ref

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Open Project Modal
  const openProjectModal = () => {
    setIsDropdownOpen(false);
    setIsProjectModalOpen(true);
  };

  // Open Document Modal
  const openDocumentModal = () => {
    setIsDropdownOpen(false);
    setIsDocumentModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-10">
      {/* Dropdown trigger */}
      <button
        className="text-xl text-[#2B2B2B] flex flex-row items-center gap-3"
        onClick={toggleDropdown}
      >
        Add New
        <div className="p-1.5 bg-[#2B2B2B] rounded-full flex items-center justify-center hover:bg-gray-700 active:scale-95 transition duration-300">
          <IoIosArrowDown className="w-[17px] h-[17px] text-white" />
        </div>
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-48 bg-gray-200 border border-gray-300 rounded-lg shadow-lg text-[#2B2B2B]"
        >
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={openProjectModal}
            >
              Project
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={openDocumentModal}
            >
              Document
            </li>
          </ul>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <Modal isVisible={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
      )}

      {/* Document Modal */}
      {isDocumentModalOpen && (
        <DocumentModal isVisible={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)} />
      )}
    </div>
  );
}
