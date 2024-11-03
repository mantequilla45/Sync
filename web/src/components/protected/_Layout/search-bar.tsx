'use client';

// components/SearchInput.tsx
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
    <div className={`relative flex items-center ${className}`}>
      {/* Search Icon */}
      <div
        className={`text-white cursor-pointer transition-all duration-300 ease-in-out ${
          isClicked ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsClicked(true)}
      >
        <IoMdSearch size={24}/>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`border border-gray-300 rounded-xl px-4 py-2 shadow-md text-black text-sm transition-all duration-300 ease-in-out ${
          isClicked ? 'w-full opacity-100 ml-3' : 'w-0 opacity-0 ml-0'
        }`}
        style={{
          maxWidth: isClicked ? '200px' : '0px',
          overflow: 'hidden',
        }}
        onBlur={() => setIsClicked(false)}
      />

      {/* Conditionally Render Close Icon */}
      {isClicked && value && (
        <IoIosCloseCircle
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer "
          onClick={clearInput}
        />
      )}
    </div>
  );
};

export default SearchInput;
