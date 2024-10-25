'use client'
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: {
    id: string;
    title: string;
    description: string;
    assignee: string;
    priority: string;
    dueDate: string;
    completed: boolean;
  }[];
  onCompleteTask: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
