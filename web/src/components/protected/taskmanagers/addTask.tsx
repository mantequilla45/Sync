import React, { useState } from 'react';
import TaskModal from './newtask-modal';
import { FaPlus } from "react-icons/fa6";



interface AddTaskButtonProps {
  onAddTask: (task: any) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <button
      onClick={openModal}
      className="mr-3 p-2 hover:scale-110 active:scale-95 transition-transform duration-300 rounded-full bg-[#ffffff]"
    >
      <FaPlus className="text-[20px] text-[#CFBCDD]" />
    </button>
      <TaskModal isOpen={isModalOpen} closeModal={closeModal} addTask={onAddTask} />
    </>
  );
};

export default AddTaskButton;
