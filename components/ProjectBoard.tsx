'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/shared/types';
import TaskColumn from './TaskColumn';
import { useTasks } from '@/hooks/useApi';

interface ProjectBoardProps {
  projectId: string;
  projectName?: string;
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({
  projectId,
  projectName = 'Project'
}) => {
  const { tasks, loading, error, fetchTasks, updateTask, deleteTask, updateTaskStatus } = useTasks(projectId);
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const getTodoTasks = () => tasks.filter(t => t.status === 'todo');
  const getInProgressTasks = () => tasks.filter(t => t.status === 'in-progress');
  const getCompletedTasks = () => tasks.filter(t => t.status === 'completed');

  const handleTaskStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleAddTask = (status: TaskStatus) => {
    // TODO: Open modal to create new task
    console.log('Add task for status:', status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-neutral-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{projectName}</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                view === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                view === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              List View
            </button>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="input w-auto"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={getTodoTasks()}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onAddTask={handleAddTask}
        />
        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={getInProgressTasks()}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onAddTask={handleAddTask}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={getCompletedTasks()}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default ProjectBoard;
