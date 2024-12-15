import React, { useState } from 'react';
import { TbDots } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';
import TaskModal from '@/components/protected/TaskManager/newtask-modal';

interface SectionHeaderProps {
  title: string;
  count: number;
  color: string;
  onAddTask: (newTask: any) => void;
  hoverColor?: string;
  activeColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  color,
  onAddTask,
  hoverColor = 'hover:bg-[#FFFAE9]',
  activeColor = 'active:bg-[#FFF0BC]',
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    phase: '',
    dateRange: '',
    daysLeft: '',
    color: '',
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const addTask = () => {
    onAddTask(newTask);
    closeModal();
    setNewTask({ title: '', phase: '', dateRange: '', daysLeft: '', color: '' }); // Reset task after adding
  };

  return (
    <div className="flex flex-col">
      <div style={{ backgroundColor: color }} className="flex rounded-xl h-[40px] z-0" />
      <div className="flex bg-white rounded-xl h-[40px] mt-[-37px] z-10 items-center px-5 gap-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex items-center gap-3">
            <p style={{ color: '#1e1e1e', fontWeight: 500, fontSize: 17 }}>{title}</p>
            <div className="border border-[#B8B8B8] rounded-full justify-center flex items-center py-0.5 px-4">
              <p style={{ color: '#B8B8B8', fontWeight: 400 }}>{count}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TbDots className="w-[30px] h-[30px] text-[#33363F]" />
            <div
              className={`relative transition-all duration-200 p-1 rounded-lg ${hoverColor} ${activeColor}`}
            >
              <FiPlus
                onClick={openModal}
                style={{ color }}
                className="w-[23px] h-[23px] transition-transform transform hover:scale-110 active:scale-95"
              />
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        title={title}
        closeModal={closeModal}
        addTask={addTask}
        handleInputChange={handleInputChange}
        newTask={newTask}
      />
    </div>
  );
};

export default SectionHeader;
