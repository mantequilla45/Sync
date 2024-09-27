"use client";

import { useState } from 'react';
import Modal from '@/components/protected/Home/modal'; // Client-side modal

export default function ModalTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="w-[150px] h-[45px] bg-[#69369B] rounded-full text-white text-md font-regular hover:bg-[#491C75] active:scale-95 active:bg-[#3B1363] transition-all duration-300"
        onClick={openModal}
      >
        New Project
      </button>

      {/* Modal component that gets toggled */}
      {isModalOpen && <Modal isVisible={isModalOpen} onClose={closeModal} />}
    </div>
  );
}
