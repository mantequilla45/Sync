'use client';

import { useState } from 'react';
import { IoMdSearch, IoIosCloseCircle } from 'react-icons/io';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  className = '',
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const clearInput = () => {
    onClear();
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}
      <div
        className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer transition-transform transition-opacity duration-300 ease-in-out ${
          isClicked ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'
        }`}
        style={{ transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out' }}
      >
        <IoMdSearch className="w-[20px] h-[20px]"/>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`border border-gray-300 rounded-full px-2 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-black text-sm pl-9 w-full transition-all duration-300 ${
          isClicked ? 'pl-[14px]' : 'pl-9'
        } focus:outline-none`}
        onFocus={() => setIsClicked(true)}
        onBlur={() => setIsClicked(false)}
      />

      {/* Style for placeholder */}
      <style jsx>{`
        input::placeholder {
          font-weight: ${isClicked ? 'normal' : '300'}; /* Light font when not focused */
        }
      `}</style>

            
      {/* Conditionally Render Close Icon */}
      {value && (
        <IoIosCloseCircle
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={clearInput}
        />
      )}
    </div>
  );
};

export default SearchInput;
