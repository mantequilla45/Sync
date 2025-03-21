import React, { useState, useEffect, useRef } from 'react';
import { TbDots } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';
// import TaskModal from '@/components/protected/taskmanagers/newtask-modal';

interface SectionHeaderProps {
  title: string;
  count: number;
  color: string;
  onAddTask: (newTask: any) => void;
  hoverColor?: string;
  activeColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  color,
  onAddTask,
  hoverColor = 'hover:bg-[#FFFAE9]',
  activeColor = 'active:bg-[#FFF0BC]',
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const closeDropdown = () => setDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="flex flex-col relative">
      <div style={{ backgroundColor: color }} className="flex rounded-xl h-[40px] z-0 w-[350px]" />
      <div className="flex bg-white rounded-xl h-[40px] mt-[-37px] z-10 items-center px-5 gap-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex items-center gap-3">
            <p style={{ color: '#1e1e1e', fontWeight: 500, fontSize: 17 }}>{title}</p>
            <div className="border border-[#B8B8B8] rounded-full justify-center flex items-center py-0.5 px-4">
              <p style={{ color: '#B8B8B8', fontWeight: 400 }}>{count}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            {/* Dots Icon */}
            <TbDots
              className="w-[30px] h-[30px] text-[#33363F] cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute text-[#2b2b2b] top-[45px] right-0 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <ul className="flex flex-col text-sm">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      closeDropdown();
                      console.log('Sort clicked');
                    }}
                  >
                    Sort
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      closeDropdown();
                      console.log('Select Multiple clicked');
                    }}
                  >
                    Select Multiple
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
