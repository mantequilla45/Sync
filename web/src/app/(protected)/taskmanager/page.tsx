"use client"
import { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/Firebase/FirebaseClient';
import TaskForm from '@/components/protected/taskmanager/TaskForm';
import TaskList from '@/components/protected/taskmanager/TaskList';

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