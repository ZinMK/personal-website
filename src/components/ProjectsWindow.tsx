import React from 'react';
import { FileText, Folder, Image, Code, Globe, Database, LucideIcon } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: LucideIcon;
  description: string;
  technologies?: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

interface ProjectsWindowProps {
  onOpenProject: (project: Project) => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onOpenProject }) => {
  const projects: Project[] = [
    {
      id: 'portfolio-website',
      name: 'Portfolio Website',
      type: 'folder',
      icon: Globe,
      description: 'Modern portfolio website built with React and TypeScript',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'completed'
    },
    {
      id: 'task-manager',
      name: 'Task Manager App',
      type: 'folder',
      icon: FileText,
      description: 'Full-stack task management application',
      technologies: ['React', 'Node.js', 'MongoDB'],
      status: 'completed'
    },
    {
      id: 'weather-app',
      name: 'Weather Dashboard',
      type: 'folder',
      icon: Image,
      description: 'Weather dashboard with interactive maps',
      technologies: ['Vue.js', 'OpenWeather API'],
      status: 'completed'
    },
    {
      id: 'ecommerce-platform',
      name: 'E-commerce Platform',
      type: 'folder',
      icon: Database,
      description: 'Scalable e-commerce solution',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      status: 'in-progress'
    },
    {
      id: 'mobile-app',
      name: 'Mobile Fitness App',
      type: 'folder',
      icon: Code,
      description: 'Cross-platform fitness tracking app',
      technologies: ['React Native', 'Firebase'],
      status: 'planned'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="win95-inset p-2 border-b">
        <div className="flex space-x-2">
          <button className="win95-button text-xs">File</button>
          <button className="win95-button text-xs">Edit</button>
          <button className="win95-button text-xs">View</button>
          <button className="win95-button text-xs">Help</button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-2 border-b bg-card">
        <div className="win95-inset px-2 py-1 text-xs">
          📁 C:\Users\Developer\Projects
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-4 bg-white">
        <div className="grid grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-center p-2 cursor-pointer hover:bg-blue-100 rounded"
              onDoubleClick={() => onOpenProject(project)}
            >
              <project.icon size={32} className="text-blue-600 mb-1" />
              <span className="text-xs text-center leading-tight">{project.name}</span>
              <div className="text-xs text-gray-500 mt-1">
                {project.status === 'completed' && '✅'}
                {project.status === 'in-progress' && '🔄'}
                {project.status === 'planned' && '📅'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        {projects.length} object(s) | {projects.filter(p => p.status === 'completed').length} completed projects
      </div>
    </div>
  );
};