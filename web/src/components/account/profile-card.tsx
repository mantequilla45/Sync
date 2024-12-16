import React, { useEffect, useState } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { FaUserCircle, FaGenderless, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { useAuth } from '@/services/Auth/AuthContext';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/Firebase/FirebaseClient';

interface ProfileCardProps {
  name: string,
  email: string,
  isEditing: boolean;
  toggleEditing: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isEditing, toggleEditing }) => {
  const { user } = useAuth(); // Get the logged-in user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); 
  const [dateOfBirth, setDateOfBirth] = useState(''); 

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return; // No user logged in
      try {
        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        const userCredDocRef = doc(db, 'userCredentials', user.uid)

        const [userSnapshot, userCredSnapshot] = await Promise.all([
          getDoc(userDocRef),
          getDoc(userCredDocRef)
        ])

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setEmail(userData.email || '');
        }

        if (userCredSnapshot.exists()) {
          const userCredData = userCredSnapshot.data();
          setName(userCredData.name || '');
          setGender(userCredData.gender || '');
          setDateOfBirth(userCredData.dateOfBirth || '');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Save updated profile data to Firestore
  const saveProfile = async () => {
    if (!user) return; // No user logged in
    try {
      const userDocRef = doc(db, "userCredentials", user.uid);
      await setDoc(userDocRef, {
        name,
        gender,
        dateOfBirth,
      }, { merge: true });

      toggleEditing(); // Exit editing mode after saving
      
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const renderInput = (
    icon: JSX.Element, 
    placeholder: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly: boolean = false
  ) => (
    <div className="flex w-[50%] flex-col">
      <h2 className="text-xl text-[#69369B] font-semibold mb-3 ml-[10px]">{placeholder}</h2>
      <div className="flex items-center">
        <div className="relative w-full">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-[#1E1E1E]">{icon}</div>
          <input
            type="text"
            placeholder={`Enter your ${placeholder.toLowerCase()}`}
            className={`w-full pl-[50px] pr-[25px] py-4 bg-[#F4F4F4] text-[#626262] rounded-full ${
              isEditing
                ? "cursor-text border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69369B]"
                : "cursor-default border-transparent focus:outline-none focus:ring-0"
            }`}
            value={value}
            onChange={onChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-[40px] pb-20 relative">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <div className="w-[200px] h-[200px] bg-[#D9D9D9] border-[2px] border-[#926AB2] rounded-full relative">
              <div className="inset-0 overflow-hidden rounded-full">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Conditionally render the edit button for the profile picture */}
                {isEditing && (
                  <button
                    className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-gradient-to-t from-[#A01887] via-[#C047DD] to-[#94C3E6] border-[1px] border-[#7F2CBF] flex justify-center items-center focus:outline-none z-10"
                    onClick={toggleEditing}
                  >
                    <AiFillEdit className="text-black w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
            <h2 className="text-md text-[#888787] font-light mt-[15px]"><strong>UID:</strong> {user?.uid}</h2>
          </div>
          <div className="flex flex-col ml-10 h-[200px] justify-center mt-[-40px]">
            <h2 className="text-3xl text-[#69369B] font-bold">Profile Photo</h2>
            <h2 className="text-sm text-[#888787]">This will be displayed on your profile</h2>
          </div>
        </div>
        <div>
          <div className="relative ml-[-30px] mt-[-12px]">
            <AiFillEdit
              onClick={toggleEditing}
              className={`text-white w-[41px] h-[41px] p-2.5 bg-[#69369B] cursor-pointer rounded-full hover:bg-[#8846C9] ${isEditing ? 'hidden' : 'block'}`}
            />
            <button
              onClick={saveProfile}
              className={`text-white w-[41px] h-[41px] p-3 bg-[#00cc9a] cursor-pointer rounded-full hover:bg-[#009e74] ${isEditing ? 'block' : 'hidden'}`}
            >
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row mt-6 gap-[25px] px-7">
        {renderInput(<FaUserCircle />, "Name", name, (e) => setName(e.target.value))}
        {renderInput(<MdAlternateEmail />, "Email", email, () => {}, true)}
      </div>
      <div className="w-full flex flex-row mt-6 gap-[25px] px-7">
        {renderInput(<FaGenderless />, "Gender", gender, (e) => setGender(e.target.value))}
        {renderInput(<FaCalendarAlt />, "Date of Birth", dateOfBirth, (e) => setDateOfBirth(e.target.value))}
      </div>
    </div>
  );
};

export default ProfileCard;
