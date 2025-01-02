"use client";
import React, { useEffect, useRef } from "react";

interface NotificationWallProps {
  isOpen: boolean;
  onClose: () => void;
  bellRef: React.RefObject<HTMLButtonElement>;
}

const NotificationWall: React.FC<NotificationWallProps> = ({ isOpen, onClose, bellRef }) => {
  const wallRef = useRef<HTMLDivElement>(null);

  // Close the notification wall if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wallRef.current &&
        !wallRef.current.contains(event.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close wall when clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, bellRef]);

  return (
    <div
      ref={wallRef}
      className={`absolute top-[60px] right-[150px] w-[300px] bg-white shadow-lg rounded-lg border border-gray-300 z-50 text-[#2b2b2b] overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "h-[200px] opacity-100" : "h-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
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
