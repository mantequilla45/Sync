"use client"
import { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/Firebase/FirebaseClient';
import TaskForm from '@/components/protected/taskmanagers/TaskForm';
import TaskList from '@/components/protected/taskmanagers/TaskList';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksArray);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'completed'>) => {
    setIsSubmitting(true);
    await addDoc(collection(db, 'tasks'), {
      ...newTask,
      completed: false,
      timestamp: new Date(),
    });
    setIsSubmitting(false);
  };

  const handleCompleteTask = async (taskId: string, completed: boolean) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { completed: !completed });
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6" style={{color: "black"}}>Task Management</h1>
      <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />
      <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default TaskManager;


// import React, { useState, useEffect } from 'react';
// import Header from '@/components/protected/_Layout/header';
// import TaskList from '@/components/protected/taskmanager/TaskList';
// import TaskForm from '@/components/protected/taskmanager/TaskForm';
// import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
// import { db } from '@/lib/Firebase/_index'; // Firebase setup
// // import SectionHeader from './SectionHeader';

// export default function TaskManager() {
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Real-time listener for tasks
//     const q = query(collection(db, 'tasks'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setTasks(tasksData);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Separate tasks into categories based on status
//   const todoTasks = tasks.filter((task) => task.status === 'To Do');
//   const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
//   const completedTasks = tasks.filter((task) => task.status === 'Completed');

//   // Function to open/close the add task modal
//   const openAddTaskModal = () => setIsModalOpen(true);
//   const closeAddTaskModal = () => setIsModalOpen(false);

//   const handleAddTask = async (newTask) => {
//     await addDoc(collection(db, 'tasks'), { ...newTask, status: 'To Do', timestamp: new Date() });
//     closeAddTaskModal();
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
//       <Header />
//       <div className="px-[90px] mb-2">
//         <h1 className="text-sm text-white font-light">Home / Task Manager</h1>
//       </div>
//       <div className="flex-grow rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16"
//         style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
//       >
//         <div className="flex flex-row gap-14">
//           <div className="flex flex-col">
//             <h1 className="text-2xl text-[#2B2B2B] font-semibold">Today's Tasks</h1>
//             <div className="flex flex-row gap-10">
//               {/* To Do Section */}
//               <div className="flex flex-col gap-5 mt-5">
//                 <SectionHeader title="To Do" count={todoTasks.length} color="#FFC700" />
//                 <button onClick={openAddTaskModal} className="px-4 py-2 bg-blue-500 text-white rounded">
//                   Add Task
//                 </button>
//                 <TaskList tasks={todoTasks} />
//               </div>

//               {/* Work In Progress Section */}
//               <div className="flex flex-col gap-5 mt-5">
//                 <SectionHeader title="In Progress" count={inProgressTasks.length} color="#F55D76" />
//                 <TaskList tasks={inProgressTasks} />
//               </div>

//               {/* Completed Section */}
//               <div className="flex flex-col gap-5 mt-5">
//                 <SectionHeader title="Completed" count={completedTasks.length} color="#4CAF50" />
//                 <TaskList tasks={completedTasks} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <TaskForm onAddTask={handleAddTask} onClose={closeAddTaskModal} />
//         </div>
//       )}
//     </div>
//   );
// }
