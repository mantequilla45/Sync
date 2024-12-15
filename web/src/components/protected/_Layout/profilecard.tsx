import React, { forwardRef } from 'react';
import { FaUser, TbLogout2, IoArrowBack } from '../../_icons';

interface ProfileCardProps {
  activeCard: string | null;
  toggleCard: (cardType: string) => void;
  logoutAndRedirect: () => Promise<void>;
}

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(({ activeCard, toggleCard, logoutAndRedirect }, ref) => {
  return (
    <div ref={ref} className="relative w-full mx-4 mr-[180px]">
      <div className="flex justify-end w-full">
        <div
          className={`absolute rounded-xl w-[13%] flex-col space-y-1 py-2 px-2 bg-white mt-2 top-0 right-0 z-50 border border-gray-100 text-[#323232] transition-all duration-300 ease-in-out ${
            activeCard === 'profile' ? 'h-[95px] opacity-100' : 'h-[0px] opacity-0'
          }`}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
        >
          {activeCard === 'profile' && (
            <>
              <a
                href="/account"
                className="flex flex-row w-full px-2 gap-3 hover:bg-gray-200 transition-all duration-200 rounded-lg items-center py-2"
              >
                <div className="ml-[1px] w-auto">
                  <FaUser className="w-[20px] h-[20px] rounded-full" />
                </div>
                <h1 className="w-[80%] text-sm font-regular">Account Settings</h1>
              </a>

              <a
                className="flex flex-row w-full px-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 rounded-lg items-center py-2"
                onClick={logoutAndRedirect}
              >
                <div>
                  <TbLogout2 className="w-[21px] h-[21px]" />
                </div>
                <h1 className="text-sm font-regular ml-3">Log Out</h1>
              </a>
            </>
          )}

          {activeCard === 'display' && (
            <div className="flex flex-col">
              <div className="flex flex-row w-full items-center">
                <button
                  onClick={() => toggleCard('profile')}
                  className="relative p-2 rounded-full transition-transform duration-300 transform hover:bg-white hover:bg-opacity-10"
                >
                  <IoArrowBack className="text-xl" />
                </button>
                <h1 className="text-lg font-regular text-white ml-2">Display</h1>
              </div>
              <div className="flex flex-row w-full mx-auto space-x-4 justify-center mt-4 mb-4">
                <button className="p-4 rounded-full bg-white border-2 border-[#C2C2C2]" />
                <button className="p-4 rounded-full bg-[#313131] border-2 border-[#2D2D2D]" />
                <button className="p-4 rounded-full bg-gradient-to-tr from-[#82245C] to-[#3D50B5] border-2 border-[#4F1869]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
