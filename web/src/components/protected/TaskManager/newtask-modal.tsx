import React, { useEffect, useState, useRef } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main CSS file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file

interface TaskModalProps {
  isOpen: boolean;
  title: string;
  closeModal: () => void;
  addTask: (newTask: { title: string; phase: string; dateRange: string; daysLeft: string; color: string }) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  newTask: { title: string; phase: string; dateRange: string; daysLeft: string; color: string };
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  title,
  closeModal,
  addTask,
  handleInputChange,
  newTask,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  
  const [error, setError] = useState<string | null>(null); // State for error message

  // Ref to the date picker container
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;

    if (selection.startDate instanceof Date && selection.endDate instanceof Date) {
      setSelectedRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection',
      });

      const formattedRange = `${selection.startDate.toLocaleDateString()} - ${selection.endDate.toLocaleDateString()}`;

      // Create a mock event object and cast it to the correct type
      const mockEvent = {
        target: {
          name: 'dateRange',
          value: formattedRange,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleInputChange(mockEvent);

      // Calculate days left
      const currentDate = new Date();
      const endDate = selection.endDate;
      const timeDiff = endDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

      // Create another mock event for daysLeft
      const mockDaysLeftEvent = {
        target: {
          name: 'daysLeft',
          value: daysLeft.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>;

      handleInputChange(mockDaysLeftEvent);
    }
  };

  // Handle clicks outside the date picker
  const handleClickOutside = (event: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
      setShowDatePicker(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    closeModal();
    // Reset newTask fields after modal closes
    setTimeout(() => {
      handleInputChange({ target: { name: 'title', value: '' } } as React.ChangeEvent<HTMLInputElement>);
      handleInputChange({ target: { name: 'phase', value: '' } } as React.ChangeEvent<HTMLSelectElement>);
      handleInputChange({ target: { name: 'dateRange', value: '' } } as React.ChangeEvent<HTMLInputElement>);
      handleInputChange({ target: { name: 'daysLeft', value: '' } } as React.ChangeEvent<HTMLInputElement>);
      setError(null); // Reset error message
    }, 300); // Delay to match the fade-out duration
  };

  const handleAddTask = () => {
    // Validation
    if (!newTask.title || !newTask.phase || !newTask.dateRange || !newTask.daysLeft) {
      setError('Please fill in all fields.'); // Set error message
      return;
    }
    
    setError(null); // Clear error if validation passes
    addTask(newTask);
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`bg-white p-10 text-[#1e1e1e] rounded-2xl w-1/4 h-1/2 flex flex-col justify-between transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-90'}`}
      >
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-[#000000] font-semibold">{title}</h2>
          
          <div className="flex items-center mr-5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20Purple%20Large.png?alt=media&token=dc1a14e5-6f1f-400e-ac86-2b82b624d079"
              alt="Description of the image"
              className="w-[25px] h-[25px]"
            />
            <h1 className="text-2xl font-bold text-[#5D1E8C] ml-[7px]">Sync</h1>

          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}

        
        <div className="flex flex-col">
          
          <label className="block mb-2">Task Name:</label>
          <input
            name="title"
            placeholder="Task Name"
            className="w-full mb-4 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60328D]"
            onChange={handleInputChange}
            value={newTask.title}
          />
          <label className="block mb-2">Select Phase:</label>
          <select
            name="phase"
            className="w-full mb-4 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60328D]"
            onChange={handleInputChange}
            value={newTask.phase}
          >
            <option value="" disabled>Select Phase</option>
            <option value="1">Phase 1</option>
            <option value="2">Phase 2</option>
            <option value="3">Phase 3</option>
            <option value="4">Phase 4</option>
          </select>

          <label className="block mb-2">Date Range:</label>
          <div className="relative">
            <input
              name="dateRange"
              placeholder="Select Date Range"
              className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#444444] cursor-pointer"
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
            onClick={handleCancel} // Updated to use handleCancel
            className="text-gray-500 p-2 rounded-xl hover:bg-[#DCDCDC] active:bg-[#C2C2C2] active:scale-95 transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask} // Updated to validate fields before adding
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
