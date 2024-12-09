import React from 'react';

interface NotificationWallProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationWall: React.FC<NotificationWallProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 w-[300px] bg-white shadow-lg rounded-lg border border-gray-300 z-50 text-[#2b2b2b]">
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        {/* Notification items */}
        <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
          <span className="text-sm text-gray-600">New message from John</span>
          <button className="text-blue-500 text-sm">View</button>
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
          <span className="text-sm text-gray-600">Your task is due tomorrow</span>
          <button className="text-blue-500 text-sm">View</button>
        </div>
      </div>
      <button
        className="w-full text-center text-sm text-gray-500 py-2 hover:bg-gray-100 rounded-b-lg"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default NotificationWall;
