import React, { useState } from 'react';
import TaskModal from './newtask-modal';

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
        className="mt-6 px-6 py-3 bg-[#69369B] text-white text-lg font-regular rounded-full hover:bg-[#572A81] transition duration-300"
      >
        Add Task
      </button>
      <TaskModal isOpen={isModalOpen} closeModal={closeModal} addTask={onAddTask} />
    </>
  );
};

export default AddTaskButton;
