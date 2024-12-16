import React, { useEffect, useState } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import { FaUserCircle, FaGenderless, FaCalendarAlt, FaCheck, FaCross } from 'react-icons/fa';
import { useAuth } from '@/services/Auth/AuthContext';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/Firebase/FirebaseClient';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FaXmark } from 'react-icons/fa6';

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
  const [displayPicture, setDisplayPicture] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [newPicture, setNewPicture] = useState<File | null>(null); // For newly selected file
  const [previewPicture, setPreviewPicture] = useState<string | null>(null); // For local preview
  const [originalData, setOriginalData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    displayPicture: null as string | null,
  });
  const [currentData, setCurrentData] = useState({ ...originalData }); // Clone for editable data


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
          setDisplayPicture(
            userCredData.displayPicture || 'https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2Fdefault.png'
          );
          setPreviewPicture(userCredData.displayPicture || null);
          const fetchedData = {
            name: userCredData.name,
            gender: userCredData.gender,
            dateOfBirth: userCredData.dateOfBirth,
            displayPicture: userCredData.displayPicture
          };
          setOriginalData(fetchedData);
          setCurrentData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "userCredentials", user.uid);
      let uploadedImageUrl = displayPicture; // Default to current picture URL if no new image

      // If a new picture is selected, upload it to Firebase Storage
      if (newPicture) {
        const storageRef = ref(storage, `profile-pictures/${user.uid}`);
        await uploadBytes(storageRef, newPicture); // Upload the image file
        uploadedImageUrl = await getDownloadURL(storageRef); // Get the public URL of the uploaded image
      }

      await setDoc(userDocRef, currentData, { merge: true })
      setOriginalData(currentData);
      await setDoc(userDocRef, {
        displayPicture: uploadedImageUrl
      }, {merge: true});

      setDisplayPicture(uploadedImageUrl); // Update the local state with the new image URL
      toggleEditing(); // Exit editing mode
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const cancelChanges = () => {
    setPreviewPicture(displayPicture); // Reset to the original image
    setCurrentData(originalData)
    toggleEditing(); // Exit editing mode
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPicture(file); // Store selected file
      setPreviewPicture(URL.createObjectURL(file)); // Generate local preview
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
                  src={previewPicture || displayPicture || 'default-image-url'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePictureChange} // Handle picture change
                  />
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
            <button
              onClick={cancelChanges}
              className={`text-white w-[41px] h-[41px] p-3 bg-[#7E7E7E] cursor-pointer rounded-full hover:bg-[#9e9e9e] ${isEditing ? 'block' : 'hidden'}`}
            >
              <FaXmark />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row mt-6 gap-[25px] px-7">
        {renderInput(<FaUserCircle />, "Name", currentData.name, (e) => setCurrentData({ ...currentData, name: e.target.value }))}
        {renderInput(<MdAlternateEmail />, "Email", email, () => {}, true)}
      </div>
      <div className="w-full flex flex-row mt-6 gap-[25px] px-7">
        {renderInput(<FaGenderless />, "Gender", currentData.gender, (e) => setCurrentData({ ...currentData, gender: e.target.value }))}
        {renderInput(<FaCalendarAlt />, "Date of Birth", currentData.dateOfBirth, (e) => setCurrentData({ ...currentData, dateOfBirth: e.target.value }))}
      </div>
    </div>
  );
};

export default ProfileCard;
