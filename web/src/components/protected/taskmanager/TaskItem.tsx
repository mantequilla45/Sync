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
  