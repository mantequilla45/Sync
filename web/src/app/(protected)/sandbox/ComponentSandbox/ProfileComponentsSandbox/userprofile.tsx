'use client'

import { useAuth } from "@/auth/AuthContext";
import React, { useEffect, useState } from 'react';
import { storage, auth } from "@/firebase"; // Import Firebase storage configuration
import { ref, getDownloadURL } from "firebase/storage"; // Import necessary Firebase Storage methods
import Image from 'next/image';

const ProfilePage: React.FC = () => {
  const { user } = useAuth(); // Get user from auth context
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      // Proceed only if there is a file and user is logged in
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/Profile/uploadProfilePicture', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          await fetchImageUrl(user.photoURL, storage);
        } else {
          console.error('Failed to upload profile picture:', data.error);
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    }
  };


const fetchImageUrl = async (photoURL: string | null, storage: any): Promise<string | null> => {
  if (!photoURL) return null;

  try {
    const storageRef = ref(storage, photoURL); 
    const url = await getDownloadURL(storageRef); 
    if (url) {
      setImageUrl(url);
      await auth.currentUser?.getIdToken(true);   
    }
    console.log(url)
    return url;
    
  } catch (err) {
    console.error("Error fetching profile image URL:", err);
    return null;
  }
};


useEffect(() => {
  const getImageUrl = async () => {
    if (!user?.photoURL) return;
    await fetchImageUrl(user.photoURL, storage);
  };

  getImageUrl();
}, [user?.photoURL]);

  return (
    <div>
      <div>Url: {imageUrl}</div>
      <div>
        {/* Render the user's profile picture or a placeholder */}
        <Image 
          src={imageUrl ?? '/default-profile.png'} 
          alt="Profile" 
          width={150} 
          height={150} 
          priority // to optimize the image loading
        />
        <h2>{user?.email ?? 'Guest User'}</h2> {/* Display user's email or fallback */}
      </div>
      <input type="file" accept="image/*" onChange={handleProfilePictureChange} /> {/* Upload input */}
    </div>
  );
};

export default ProfilePage;
