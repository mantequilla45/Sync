import React from 'react';
import Header from '../../../components/protected/header';

const ProfilePage = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header />
        <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light font-poppins">Home / Account</h1>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
