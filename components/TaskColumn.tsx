'use client';

import React from 'react';
import { Task, TaskStatus } from '@/shared/types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onAddTask?: (status: TaskStatus) => void;
}

const getColumnColor = (status: TaskStatus): string => {
  switch (status) {
    case 'todo':
      return 'border-l-orange-500';
    case 'in-progress':
      return 'border-l-blue-500';
    case 'completed':
      return 'border-l-green-500';
    default:
      return 'border-l-gray-500';
  }
};

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onAddTask
}) => {
  return (
    <div className={`flex-1 bg-neutral-50 rounded-lg p-4 border-l-4 ${getColumnColor(status)} min-w-[320px]`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
          <span className="inline-flex items-center justify-center w-6 h-6 bg-neutral-200 rounded-full text-xs font-medium text-neutral-700">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask?.(status)}
          className="text-neutral-400 hover:text-neutral-600 text-xl transition-colors"
          title="Add task"
        >
          +
        </button>
      </div>

      {/* Tasks Container */}
      <div className="space-y-2 min-h-[400px]">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-center">
            <p className="text-sm text-neutral-400">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
