'use client'
interface TaskItemProps {
    task: {
      id: string;
      title: string;
      description: string;
      assignee: string;
      priority: string;
      dueDate: string;
      completed: boolean;
    };
    onCompleteTask: (taskId: string, completed: boolean) => void;
    onDeleteTask: (taskId: string) => void;
  }
  
export const TaskItem: React.FC<TaskItemProps> = ({ task, onCompleteTask, onDeleteTask }) => {
   return (
     <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
       <div>
         <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : ''}`} style={{color: "black"}}>{task.title}</h3>
         <p style={{color: "black"}}>{task.description}</p>
         <p style={{color: "black"}}>Assigned to: {task.assignee}</p>
          <p style={{color: "black"}}>Priority: {task.priority}</p>
          <p style={{color: "black"}}>Due: {task.dueDate}</p>
       </div>
       <div className="flex space-x-2">
         <button
           onClick={() => onCompleteTask(task.id, task.completed)}
           className={`px-4 py-2 rounded ${task.completed ? 'bg-gray-500' : 'bg-green-500'} text-white`}
         >
           {task.completed ? 'Undo' : 'Complete'}
         </button>
         <button
           onClick={() => onDeleteTask(task.id)}
           className="px-4 py-2 bg-red-500 text-white rounded"
         >
           Delete
         </button>
        </div>
      </li>
    );
  };
  
  export default TaskItem;
  
// interface TaskItemProps {
//   task: {
//     id: string;
//     title: string;
//     phase: string;
//     dateRange: string;
//     daysLeft: string;
//     color: string;
//     completed: boolean;
//   };
// }

// export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
//   return (
//     <div className="flex bg-white w-[350px] h-auto rounded-xl p-6 flex-col gap-6">
//       <div className="flex w-full justify-between">
//         <div className="flex flex-col gap-3">
//           <div className="flex gap-3 items-center">
//             <div style={{ backgroundColor: task.color }} className="rounded-full w-[18px] h-[18px]" />
//             <p style={{ color: "#707070", fontWeight: 400 }}>{task.phase}</p>
//           </div>
//           <p className="text-2xl text-[#000000] ml-2">{task.title}</p>
//         </div>
//       </div>
//       <div className="flex w-full justify-between">
//         <p className="text-md text-[#000000] ml-2">{task.dateRange}</p>
//         <p className="text-md text-[#707070] ml-2">{task.daysLeft}</p>
//       </div>
//     </div>
//   );
// }

// export default TaskItem;
