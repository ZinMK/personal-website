import React, { useState } from "react";
import {
  FileText,
  Folder,
  Image,
  Code,
  Globe,
  Database,
  AppWindow,
  LucideIcon,
  List,
  Grid3X3,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface Project {
  id: string;
  name: string;
  type: "folder" | "file";
  icon: LucideIcon;
  description: string;
  technologies?: string[];
  status: "completed" | "in-progress" | "planned";
  completedDate?: string;
}

interface ProjectsWindowProps {
  onOpenProject: (project: Project) => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  onOpenProject,
}) => {
  const [viewMode, setViewMode] = useState<"detailed" | "grid">("detailed");
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      id: "classfinder-ai",
      name: "ClassFinder.ai",
      type: "folder",
      icon: Globe,
      description:
        "Developed an NLP search tool parsing conversational queries for class schedules, outperforming keyword search efficiency. Containerized the full-stack application using Docker, ensuring consistent runtime environments across servers.",
      technologies: [
        "React",
        "TypeScript",
        "Google ADK",
        "Docker",
        "NLP",
        "Google Cloud Platform",
      ],
      status: "completed",
      completedDate: "2024-01-15",
    },
    {
      id: "eureka",
      name: "Eureka - Campus Social App",
      type: "folder",
      icon: AppWindow,
      description:
        "Launched a mobile app for student hangouts, acquiring 64 active users and facilitating 200+ student events. Implemented real-time geolocation sharing using Firebase Realtime Database and engineered a push notification system that drove a 40% increase in daily active user engagement.",
      technologies: [
        "Flutter",
        "Firebase",
        "Maps API",
        "Google Cloud Platform",
        "Push Notifications",
        "Real-time Database",
      ],
      status: "completed",
      completedDate: "2023-11-20",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "in-progress":
        return <Clock size={16} className="text-yellow-600" />;
      case "planned":
        return <Calendar size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="win95-inset p-2 border-b">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className={`win95-button text-xs flex items-center space-x-1 ${
                viewMode === "detailed" ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() =>
                viewMode === "detailed"
                  ? setViewMode("grid")
                  : setViewMode("detailed")
              }
            >
              View
            </button>
            <button className="win95-button text-xs">Help</button>
          </div>
          {/* <div className="flex space-x-1">
            <button
              className={`win95-button text-xs flex items-center space-x-1 ${
                viewMode === "detailed" ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setViewMode("detailed")}
            >
              <List size={12} />
              <span>Details</span>
            </button>
            <button
              className={`win95-button text-xs flex items-center space-x-1 ${
                viewMode === "grid" ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 size={12} />
              <span>Icons</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-2 border-b bg-card">
        <div className="win95-inset px-2 py-1 text-xs">
          📁 C:\Users\Developer\Projects
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        {viewMode === "detailed" ? (
          // Detailed List View
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="win95-inset p-3 cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => onOpenProject(project)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <project.icon size={32} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="text-xs text-gray-600">
                          {getStatusText(project.status)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies
                          ?.slice(0, 4)
                          .map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        {project.technologies &&
                          project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                      </div>
                      {project.completedDate && (
                        <span className="text-xs text-gray-500">
                          {new Date(project.completedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grid View (Original)
          <div className="grid grid-cols-4 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col items-center p-2 cursor-pointer hover:bg-blue-100 rounded"
                onClick={() => onOpenProject(project)}
              >
                <project.icon size={32} className="text-blue-600 mb-1" />
                <span className="text-xs text-center leading-tight">
                  {project.name}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {project.status === "completed" && "✅"}
                  {project.status === "in-progress" && "🔄"}
                  {project.status === "planned" && "📅"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        {projects.length} object(s) |{" "}
        {projects.filter((p) => p.status === "completed").length} completed
        projects | View: {viewMode === "detailed" ? "Details" : "Icons"}
      </div>
    </div>
  );
};
