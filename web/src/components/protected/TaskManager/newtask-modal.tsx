// TaskModal.tsx
import React from 'react';

interface TaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addTask: (newTask: { title: string; phase: string; dateRange: string; daysLeft: string; color: string }) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newTask: { title: string; phase: string; dateRange: string; daysLeft: string; color: string };
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, closeModal, addTask, handleInputChange, newTask }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                <input
                    name="title"
                    placeholder="Task Title"
                    className="w-full mb-3 p-2 border"
                    onChange={handleInputChange}
                />
                <input
                    name="phase"
                    placeholder="Phase"
                    className="w-full mb-3 p-2 border"
                    onChange={handleInputChange}
                />
                <input
                    name="dateRange"
                    placeholder="Date Range (e.g., 24/10/24 - 2/11/24)"
                    className="w-full mb-3 p-2 border"
                    onChange={handleInputChange}
                />
                <input
                    name="daysLeft"
                    placeholder="Days Left"
                    className="w-full mb-3 p-2 border"
                    onChange={handleInputChange}
                />
                <input
                    name="color"
                    placeholder="Color (e.g., #A228FF)"
                    className="w-full mb-3 p-2 border"
                    onChange={handleInputChange}
                />
                <div className="flex justify-end gap-3">
                    <button onClick={closeModal} className="text-gray-500">Cancel</button>
                    <button onClick={() => addTask(newTask)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
