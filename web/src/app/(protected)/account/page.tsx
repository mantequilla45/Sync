'use client';
import Header from '@/components/protected/_Layout/header';
import SearchInput from '../../../components/protected/_Layout/search-bar';
import React, { useState } from 'react';
import { MdAccountCircle, MdOutlineSecurity, MdDelete } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import ProfileCard from '../../../components/account/profile-card';
import NotificationCard from '../../../components/account/notification-card';
import PasswordSecurity from '../../../components/account/pass-sec';
import AccountDeletion from '../../../components/account/account-deletion';

const ProfilePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onClear = () => {
    setInputValue('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">
            <a href="/home" className="text-white hover:text-gray-300">Home</a> / 
            <span className="text-[#F6F61E] ml-1">Account</span>
        </h1>
      </div>
      <div className="relative flex justify-center mx-16 mb-16">
        <div className="absolute inset-0 bg-[#FFFFFF] rounded-2xl opacity-[35%] w-[75%] mx-auto shadow-lg z-0" />
        <div className="relative flex flex-row space-x-8 px-8 w-[75%] py-8 z-10">
          <div className="flex-none rounded-xl py-2" style={{ width: '25%' }}>
            <SearchInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClear={onClear} // Pass onClear function here
              placeholder="Search Info"
              className="max-w-full"
            />
            <hr className="my-4 w-full border-[#685C5C] opacity-[65%]" />
            <div className="space-y-6 font-regular mt-6 text-3xl text-[#222726]">
              <div className="flex flex-rows items-center space-x-3">
                <MdAccountCircle />
                <h2 className="text-lg">Basic Information</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <IoIosNotifications />
                <h2 className="text-lg">Notification</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <MdOutlineSecurity />
                <h2 className="text-lg">Password and Security</h2>
              </div>
              <div className="flex flex-rows items-center space-x-3">
                <MdDelete />
                <h2 className="text-lg">Delete Account</h2>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col space-y-5">
            <ProfileCard name={name} email={email} isEditing={isEditing} toggleEditing={toggleEditing} />
            <NotificationCard />
            <PasswordSecurity />
            <AccountDeletion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
