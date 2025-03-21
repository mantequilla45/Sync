import React, { useState } from 'react';
import { FaFlag, FaHourglassStart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";


interface TaskCardProps {
    id: string;
    title: string;
    phase: string;
    dateRange: string;
    daysLeft: string;
    status: string;
    onUpdateTask: (id: string, updatedStatus: string) => void;
    onDeleteTask: (id: string) => void;
}
const TaskCard: React.FC<TaskCardProps> = ({ id, title, phase, dateRange, daysLeft, status, onUpdateTask, onDeleteTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalAction, setModalAction] = useState<'complete' | 'delete' | null>(null);

    const getPhaseDetails = (phase: string) => {
        switch (phase) {
            case '1':
                return { color: '#FF5722', description: 'Phase 1 - Design' };
            case '2':
                return { color: '#4CAF50', description: 'Phase 2 - Planning' };
            case '3':
                return { color: '#F55D76', description: 'Phase 3 - Development' };
            case '4':
                return { color: '#A228FF', description: 'Phase 4 - Execution' };
            default:
                return { color: '#000000', description: 'Unknown Phase' };
        }
    };

    const { color, description } = getPhaseDetails(phase);

    const handleComplete = ()=> {
        onUpdateTask(id, "Completed");
    }

    const handleDelete = ()=> {
        onDeleteTask(id);
    }

    const openModal = (action: 'complete' | 'delete') => {
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (modalAction === 'complete') {
            onUpdateTask(id, "Completed");
        } else if (modalAction === 'delete') {
            onDeleteTask(id);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="flex bg-white w-[350px] h-auto rounded-xl p-6 flex-col gap-6 transition-transform duration-200 shadow-md hover:shadow-lg hover:scale-[0.99] group ">
                <div
                    className="absolute rounded-lg p-1 bg-gray-500 flex flex-col gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ top: '15px', right: '15px' }}
                >
                    {status !== "Completed" && (
                        <div className="rounded-full p-2 hover:bg-gray-400" onClick={() => openModal('complete')}>
                        <FaCheck className="text-white w-[17px] h-[17px]" />
                    </div>
                    )}
                    
                    <div className="rounded-full p-2 hover:bg-gray-400" onClick={() => openModal('delete')}>
                        <FaRegTrashCan className="text-white w-[17px] h-[17px]" />
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                            <div style={{ backgroundColor: color }} className="rounded-full w-[18px] h-[18px]" />
                            <p style={{ color: "#707070", fontWeight: 400 }}>{description}</p>
                        </div>
                        <p className="text-2xl text-[#000000] ml-2">{title}</p>
                    </div>
                    <div className="bg-[#D9D9D9] w-[50px] h-[50px] rounded-full"></div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex items-center gap-1 ml-[2px]">
                        <FaFlag className="w-[15px] h-[15px] text-[#1E9700] mt-[-1px]" />
                        <p className="text-md text-[#000000] ml-2">{dateRange}</p>
                    </div>
                    <div className="flex items-center">
                        <FaHourglassStart className="w-[15px] h-[15px] text-[#DB692C] mt-[-1px]" />
                        <p className="text-md text-[#707070] ml-2">{daysLeft}d</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-[300px] text-center shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            {modalAction === 'complete'
                                ? "Mark this task as complete?"
                                : "Are you sure you want to delete this task?"}
                        </h2>
                        <div className="flex justify-around">
                            <button
                                onClick={handleConfirm}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
