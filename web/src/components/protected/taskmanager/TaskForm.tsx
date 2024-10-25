'use client'
import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (newTask: { title: string; description: string; assignee: string; priority: string; dueDate: string }) => void;
  isSubmitting: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isSubmitting }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', priority: 'Low', dueDate: '' });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask(newTask);
      setNewTask({ title: '', description: '', assignee: '', priority: 'Low', dueDate: '' });
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <input
        type="text"
        style={{color: "black"}}
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="px-4 py-2 border rounded"
        placeholder="Task Title"
      />
      <textarea
        value={newTask.description}
        style={{color: "black"}}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className="px-4 py-2 border rounded"
        placeholder="Task Description"
      />
      <input
        type="text"
        style={{color: "black"}}
        value={newTask.assignee}
        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        className="px-4 py-2 border rounded"
        placeholder="Assignee"
      />
      <select
        value={newTask.priority}
        style={{color: "black"}}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        className="px-4 py-2 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        style={{color: "black"}}
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={handleAddTask}
        className={`px-4 py-2 bg-blue-600 text-white rounded ${isSubmitting ? 'opacity-50' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </div>
  );
};

export default TaskForm;
