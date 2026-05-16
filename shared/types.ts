// Frontend shared types (also includes backend types)

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'viewer';
  createdAt: Date;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  icon: string;
  ownerId: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export type TaskPriority = 'not-important' | 'ok' | 'main' | 'important';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  assignees: string[];
  comments: number;
  likes: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  taskId: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
