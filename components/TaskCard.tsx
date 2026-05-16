'use client';

import React from 'react';
import { Task } from '@/shared/types';

interface TaskCardProps {
  task: Task;
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'important':
      return 'bg-red-100 text-red-700';
    case 'main':
      return 'bg-blue-100 text-blue-700';
    case 'ok':
      return 'bg-yellow-100 text-yellow-700';
    case 'not-important':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'important':
      return 'Important';
    case 'main':
      return 'Main';
    case 'ok':
      return 'OK';
    case 'not-important':
      return 'Not that important';
    default:
      return priority;
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="card p-4 mb-3 hover:shadow-md transition-shadow cursor-move">
      {/* Priority Badge */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-neutral-500">Progress</span>
          <span className="text-xs font-medium text-neutral-700">{task.progress}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Assignees and Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee, idx) => (
            <img
              key={idx}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${assignee}`}
              alt="avatar"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-white flex items-center justify-center text-xs font-semibold">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>

        {/* Comments and Likes */}
        <div className="flex gap-3 text-xs text-neutral-500">
          <span>💬 {task.comments}</span>
          <span>❤️ {task.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
