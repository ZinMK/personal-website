import React from 'react';
import { ExternalLink, Github, Globe, Calendar, CheckCircle } from 'lucide-react';

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetailWindow: React.FC<ProjectDetailProps> = ({ projectId }) => {
  // Sample project data - in a real app this would come from props or state
  const projectData = {
    'portfolio-website': {
      name: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, dark mode support, and optimized performance.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      status: 'completed',
      completedDate: '2024-01-15',
      liveUrl: 'https://johndeveloper.dev',
      githubUrl: 'https://github.com/johndeveloper/portfolio',
      features: [
        'Responsive design for all devices',
        'Dark/light mode toggle',
        'Smooth scroll animations',
        'Contact form with validation',
        'SEO optimized'
      ],
      challenges: 'The main challenge was implementing smooth animations while maintaining 60fps performance across all devices.',
      learnings: 'Learned advanced CSS animations and performance optimization techniques.'
    },
    'task-manager': {
      name: 'Task Manager App',
      description: 'Full-stack task management application with real-time collaboration features. Users can create projects, assign tasks, and track progress.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
      status: 'completed',
      completedDate: '2023-12-10',
      liveUrl: 'https://taskmaster-app.com',
      githubUrl: 'https://github.com/johndeveloper/task-manager',
      features: [
        'Real-time collaboration',
        'User authentication & authorization',
        'Drag & drop task organization',
        'Progress tracking & analytics',
        'Email notifications'
      ],
      challenges: 'Implementing real-time synchronization between multiple users without conflicts.',
      learnings: 'Gained expertise in WebSocket technology and conflict resolution algorithms.'
    }
  };

  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Project Not Found</h2>
          <p className="text-sm text-gray-600">The requested project could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="win95-inset p-2 border-b bg-card">
        <div className="flex space-x-2">
          <button className="win95-button text-xs">File</button>
          <button className="win95-button text-xs">Edit</button>
          <button className="win95-button text-xs">View</button>
          <button className="win95-button text-xs">Help</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <CheckCircle size={16} className="text-green-600" />
                <span>Status: {project.status}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>Completed: {project.completedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="win95-button text-xs flex items-center space-x-1">
              <Globe size={12} />
              <span>Live Demo</span>
            </button>
            <button className="win95-button text-xs flex items-center space-x-1">
              <Github size={12} />
              <span>Source Code</span>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Project Description</h3>
          <div className="win95-inset p-3 bg-gray-50">
            <p className="text-sm leading-relaxed">{project.description}</p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="win95-button text-xs px-2 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Key Features</h3>
          <div className="win95-inset p-3 bg-gray-50">
            <ul className="text-sm space-y-1">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Challenges & Learnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Challenges</h3>
            <div className="win95-inset p-3 bg-gray-50">
              <p className="text-sm">{project.challenges}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Key Learnings</h3>
            <div className="win95-inset p-3 bg-gray-50">
              <p className="text-sm">{project.learnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        Project loaded | Last modified: {project.completedDate}
      </div>
    </div>
  );
};