import React, { useEffect, useState, useRef } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main CSS file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import Image from 'next/image';


interface TaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addTask: (newTask: { title: string; phase: string; dateRange: string; daysLeft: string; color: string; status: string }) => void;
}

type Status = 'To Do' | 'Work In Progress' | 'Completed' | '';

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  closeModal,
  addTask,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [error, setError] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const [newTask, setNewTask] = useState<{
    title: string;
    phase: string;
    dateRange: string;
    daysLeft: string;
    color: string;
    status: Status;
  }>({
    title: '',
    phase: '',
    dateRange: '',
    daysLeft: '',
    color: '',
    status: '',
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add('no-scroll');
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.classList.remove('no-scroll');
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    if (selection.startDate instanceof Date && selection.endDate instanceof Date) {
      setSelectedRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection',
      });

      const formattedRange = `${selection.startDate.toLocaleDateString()} - ${selection.endDate.toLocaleDateString()}`;

      handleInputChange({
        target: {
          name: 'dateRange',
          value: formattedRange,
        },
      } as React.ChangeEvent<HTMLInputElement>);

      const currentDate = new Date();
      const endDate = selection.endDate;
      const timeDiff = endDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)).toString();

      handleInputChange({
        target: { name: 'daysLeft', value: daysLeft },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    setShowDatePicker(false);
  };

  const handleCancel = () => {
    closeModal();
    setNewTask({
      title: '',
      phase: '',
      dateRange: '',
      daysLeft: '',
      color: '',
      status: '',
    });
    setError(null);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.phase || !newTask.dateRange || !newTask.daysLeft || !newTask.status) {
      setError('Please fill in all fields.');
      return;
    }

    const statusColors = {
      'To Do': '#FFC700',
      'Work In Progress': '#F55D76',
      'Completed': '#FB0E9C',
    };

    setError(null);
    addTask({ ...newTask, color: statusColors[newTask.status] });
    closeModal();
    setNewTask({
      title: '',
      phase: '',
      dateRange: '',
      daysLeft: '',
      color: '',
      status: '',
    });
    setError(null);
  };

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 flex justify-center items-center transition-opacity duration-300 overflow-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 text-[#1e1e1e] rounded-2xl w-1/4 h-1/8 flex flex-col justify-between transform transition-transform duration-300 relative ${isOpen ? 'scale-100' : 'scale-90'}`}>
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-[#000000] font-semibold">Add Task</h2>
          <div className="flex items-center mr-5">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20Purple%20Large.png?alt=media&token=dc1a14e5-6f1f-400e-ac86-2b82b624d079"
              alt="Sync Logo"
              width = {25}
              height = {25}
            />
            <h1 className="text-2xl font-bold text-[#5D1E8C] ml-[7px]">Sync</h1>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex flex-col">
          <label className="block mb-2">Task Name:</label>
          <input
            name="title"
            placeholder="Task Name"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60328D]"
            onChange={handleInputChange}
            value={newTask.title}
          />
          <label className="block mb-2">Select Phase:</label>
          <select
            name="phase"
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60328D]"
            onChange={handleInputChange}
            value={newTask.phase}
          >
            <option value="" disabled>Select Phase</option>
            <option value="1">1. Design</option>
            <option value="2">2. Planning</option>
            <option value="3">3. Development</option>
            <option value="4">4. Execution</option>
          </select>

          <label className='block mb-2'>Status:</label>
          <select
            name='status'
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60328D]"
            onChange={handleInputChange}
            value={newTask.status}
          >
            <option value="" disabled>Select Status</option>
            <option value="To Do">To Do</option>
            <option value="Work In Progress">Work In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label className="block mb-2">Date Range:</label>
          <div className="relative">
            <input
              name="dateRange"
              placeholder="Select Date Range"
              className="w-full mb-4 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#444444] cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}
              readOnly
              value={newTask.dateRange}
            />
            {showDatePicker && (
              <div className="absolute top-16 z-50" ref={datePickerRef}>
                <DateRange
                  ranges={[selectedRange]}
                  onChange={handleRangeChange}
                  rangeColors={['#60328D']}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="text-gray-500 p-2 rounded-xl hover:bg-[#DCDCDC] active:bg-[#C2C2C2] active:scale-95 transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-[#69369B] text-white px-5 py-2 rounded-xl hover:bg-[#60328D] active:scale-95 transition-all duration-300 ease-in-out"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;