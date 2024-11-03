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

// import { useState } from 'react';

// interface TaskFormProps {
//   onAddTask: (newTask: { title: string; description: string; assignee: string; priority: string; dueDate: string }) => void;
//   onClose: () => void;
// }

// const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose }) => {
//   const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', priority: 'Low', dueDate: '' });

//   const handleSubmit = () => {
//     if (newTask.title.trim()) {
//       onAddTask(newTask);
//       setNewTask({ title: '', description: '', assignee: '', priority: 'Low', dueDate: '' });
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg max-w-md w-full">
//       <h2 className="text-2xl font-bold mb-4">Add Task</h2>
//       <input
//         type="text"
//         value={newTask.title}
//         onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Task Title"
//       />
//       <textarea
//         value={newTask.description}
//         onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Task Description"
//       />
//       <input
//         type="text"
//         value={newTask.assignee}
//         onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Assignee"
//       />
//       <select
//         value={newTask.priority}
//         onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//         className="w-full p-2 border rounded mb-4"
//       >
//         <option value="Low">Low</option>
//         <option value="Medium">Medium</option>
//         <option value="High">High</option>
//       </select>
//       <input
//         type="date"
//         value={newTask.dueDate}
//         onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//         className="w-full p-2 border rounded mb-4"
//       />
//       <div className="flex justify-end gap-4">
//         <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
//         <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add Task</button>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;
