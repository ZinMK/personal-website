import React from "react";
import {
  ExternalLink,
  Github,
  Globe,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface ProjectDetailProps {
  projectId: string;
}

export const ProjectDetailWindow: React.FC<ProjectDetailProps> = ({
  projectId,
}) => {
  // Sample project data - in a real app this would come from props or state
  const projectData = {
    "classfinder-ai": {
      name: "ClassFinder.ai",
      description:
        "Developed an NLP search tool parsing conversational queries for class schedules, outperforming keyword search efficiency. The application uses natural language processing to understand user intent and provide relevant course recommendations. Containerized the full-stack application using Docker, ensuring consistent runtime environments across servers.",
      technologies: [
        "React",
        "TypeScript",
        "Google ADK",
        "Docker",
        "NLP",
        "Google Cloud Platform",
        "Node.js",
      ],
      status: "completed",
      completedDate: "2024-01-15",
      liveUrl: "https://classfinder.ai",
      githubUrl: "https://github.com/ZinMK/classfinder-ai",
      features: [
        "Natural language processing for conversational queries",
        "Intelligent class schedule parsing",
        "Superior search efficiency compared to keyword search",
        "Docker containerization for consistent deployment",
        "Full-stack application architecture",
        "Responsive web interface",
      ],
      challenges:
        "The main challenge was developing an NLP system that could accurately parse conversational queries and understand user intent for class schedules. Implementing efficient search algorithms that outperformed traditional keyword-based approaches required careful design and optimization.",
      learnings:
        "Gained expertise in NLP implementation, Docker containerization, and building scalable search systems. Learned how to leverage Google ADK for intelligent agent development and improved skills in full-stack application architecture.",
    },

    eureka: {
      name: "Eureka - Campus Social App",
      description:
        "Launched a mobile app for student hangouts, acquiring 64 active users and facilitating 200+ student events. Implemented real-time geolocation sharing using Firebase Realtime Database to handle concurrent location updates. Engineered a push notification system that drove a 40% increase in daily active user engagement.",
      technologies: [
        "Flutter",
        "Firebase",
        "Maps API",
        "Google Cloud Platform",
        "Push Notifications",
        "Real-time Database",
        "Geolocation Services",
      ],
      status: "completed",
      completedDate: "2023-11-20",
      liveUrl: "https://apps.apple.com/us/app/eureka-campus-buddy/id6470950630",
      githubUrl: "-",
      features: [
        "Real-time geolocation sharing with Firebase Realtime Database",
        "Student event creation and management",
        "Push notification system for user engagement",
        "Concurrent location update handling",
        "Campus-specific social networking",
        "User profile and matching system",
        "Event discovery and RSVP functionality",
      ],
      challenges:
        "The biggest challenge was implementing a robust real-time geolocation system that could handle concurrent location updates efficiently while maintaining good performance. Building a push notification system that effectively increased user engagement required careful design and testing.",
      learnings:
        "Gained deep expertise in Flutter mobile development, Firebase Realtime Database integration, and push notification systems. Learned how to optimize for concurrent data updates and developed skills in user engagement optimization. Achieved significant results with 64 active users and 200+ events facilitated.",
    },
  };

  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Project Not Found</h2>
          <p className="text-sm text-gray-600">
            The requested project could not be loaded.
          </p>
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
            {project.liveUrl && project.liveUrl !== "-" && (
              <button
                className="win95-button text-xs flex items-center space-x-1"
                onClick={() =>
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer")
                }
              >
                <Globe size={12} />
                <span>Live Demo</span>
              </button>
            )}
            {project.githubUrl && project.githubUrl !== "-" && (
              <button
                className="win95-button text-xs flex items-center space-x-1"
                onClick={() =>
                  window.open(
                    project.githubUrl,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <Github size={12} />
                <span>Source Code</span>
              </button>
            )}
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
