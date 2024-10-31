import React from 'react';

const NotificationCard = () => {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-5 text-[#1E1E1E]">
      <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Notification</h2>
      <div className="flex flex-row m-10">
        <div className="flex flex-col w-1/2">
          <h1 className="font-semibold text-xl">Email Notification</h1>
          <p className="text-lg">Get emails to find out what's going on</p>
        </div>
        <div className="flex flex-col w-1/2">
          <h1 className="font-semibold text-xl">Push Notification</h1>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
