import React from 'react';
import Header from '../../../components/protected/header';

const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header />
        <div className="px-[90px] mb-2">
          <h1 className="text-sm text-white font-light">Home / Account</h1>
        </div>
        {/* Background container with opacity */}
        <div className="relative flex-grow mx-16 mb-16">
          <div className="absolute inset-0 bg-[#F6F6F6] rounded-2xl opacity-[35%] shadow-lg z-0"></div>
          <div className="relative flex flex-row space-x-8 px-14 py-10 z-10">
            {/* Card 1 */}
            <div className="flex-none rounded-xl shadow-md p-6" style={{ width: '30%' }}>
              {/* Content of Card 1 */}
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
              <h2 className="text-xl font-regular mb-4">Basic Information</h2>
            </div>

            {/* Card 2 */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6">
              {/* Content of Card 2 */}
              <h2 className="text-xl font-semibold mb-4">Card Title 2</h2>
              <p className="text-gray-700">This is some content inside the second card.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
