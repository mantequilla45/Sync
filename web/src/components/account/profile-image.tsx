import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { useState, ChangeEvent } from 'react';
import React from 'react'; 

interface ProfileImageProps {
  displayPicture?: string;
  isEditing?: boolean;
  onPictureChange: (file: File) => void;
  className?: string;
  width?: number;
  height?: number;
}

const ProfileImage = ({ 
  displayPicture, 
  isEditing = false, 
  onPictureChange,
  className = "",
  width = 200,
  height = 200
}: ProfileImageProps) => {
  const [previewPicture, setPreviewPicture] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setPreviewPicture(previewUrl);
    onPictureChange(file);
  };

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewPicture) {
        URL.revokeObjectURL(previewPicture);
      }
    };
  }, [previewPicture]);

  return (
    <div 
      className={`relative bg-[#D9D9D9] border-[2px] border-[#926AB2] rounded-full overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {imageError || (!displayPicture && !previewPicture) ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <FaUser className="w-1/2 h-1/2 text-gray-400 " />
        </div>
      ) : (
        <Image
          src={previewPicture || displayPicture || ''}
          alt="Profile"
          width={width}
          height={height}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          priority
          unoptimized
        />
      )}
      {isEditing && (
        <label className="absolute inset-0 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handlePictureChange}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-sm">Change Photo</span>
          </div>
        </label>
      )}
    </div>
  );
};

export default ProfileImage;