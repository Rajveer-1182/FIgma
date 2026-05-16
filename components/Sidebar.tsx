'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/shared/types';
import { useProjects } from '@/hooks/useApi';

interface SidebarProps {
  activeProjectId?: string;
  onProjectSelect?: (projectId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeProjectId,
  onProjectSelect
}) => {
  const { projects, fetchProjects } = useProjects();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <aside
      className={`bg-white border-r border-neutral-200 transition-all duration-300 h-screen flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="font-bold text-neutral-900">slothUI</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-neutral-100 rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {/* Main Menu */}
        <div className="mb-6">
          {!isCollapsed && <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase mb-3">Main</h3>}
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors ${!isCollapsed ? '' : 'justify-center'}`}>
                <span className="text-xl">📊</span>
                {!isCollapsed && <span className="text-sm font-medium">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link href="/inbox" className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors ${!isCollapsed ? '' : 'justify-center'}`}>
                <span className="text-xl">📬</span>
                {!isCollapsed && <span className="text-sm font-medium">Inbox</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between px-4 mb-3">
            {!isCollapsed && <h3 className="text-xs font-semibold text-neutral-500 uppercase">Projects</h3>}
            <button className="text-neutral-400 hover:text-neutral-600">+</button>
          </div>
          <ul className="space-y-1">
            {projects.map(project => (
              <li key={project._id}>
                <button
                  onClick={() => onProjectSelect?.(project._id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors ${
                    activeProjectId === project._id ? 'bg-neutral-100' : ''
                  } ${!isCollapsed ? '' : 'justify-center'}`}
                >
                  <span className="text-lg">{project.icon}</span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">{project.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-200 p-4">
        <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors ${!isCollapsed ? '' : 'justify-center'}`}>
          <span className="text-xl">👤</span>
          {!isCollapsed && <span className="text-sm font-medium">Profile</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
