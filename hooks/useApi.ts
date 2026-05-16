import { useState, useCallback } from 'react';
import api from '@/lib/api';
import { Task, Project } from '@/shared/types';

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = projectId ? { projectId } : {};
      const response = await api.get('/tasks', { params });
      setTasks(response.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createTask = useCallback(async (data: Partial<Task>) => {
    try {
      const response = await api.post('/tasks', data);
      setTasks([response.data.data, ...tasks]);
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [tasks]);

  const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
    try {
      const response = await api.patch(`/tasks/${id}`, data);
      setTasks(tasks.map(t => t._id === id ? response.data.data : t));
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [tasks]);

  const updateTaskStatus = useCallback(async (id: string, status: string) => {
    return updateTask(id, { status: status as any });
  }, [updateTask]);

  const updateTaskProgress = useCallback(async (id: string, progress: number) => {
    return updateTask(id, { progress });
  }, [updateTask]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskProgress
  };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async (userId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = userId ? { userId } : {};
      const response = await api.get('/projects', { params });
      setProjects(response.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (data: Partial<Project>) => {
    try {
      const response = await api.post('/projects', data);
      setProjects([response.data.data, ...projects]);
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [projects]);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    try {
      const response = await api.patch(`/projects/${id}`, data);
      setProjects(projects.map(p => p._id === id ? response.data.data : p));
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [projects]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [projects]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};
