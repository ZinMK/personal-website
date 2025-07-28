import React from "react";
import {
  ExternalLink,
  Github,
  Globe,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { channel } from "diagnostics_channel";

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
        "An intelligent online class finding agent that helps users discover and enroll in courses. Built with modern web technologies and AI-powered search capabilities.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "TypeScript",
        "API",
        "Tool Calling",
        "Google Agent Development Kit",
        "Google Cloud Platform",
        "Vertex AI",
        "Python",
        "Docker/Kubernetes",
        "N8N",
        "Node.js",
        "Express",
      ],
      status: "completed",
      completedDate: "2024-01-15",
      liveUrl: "https://classfinder.ai",
      githubUrl: "https://github.com/johndeveloper/classfinder-ai",
      features: [
        "AI-powered course search and recommendations",
        "Intelligent class matching algorithm",
        "Real-time course availability checking",
        "User-friendly interface with modern design",
        "Responsive design for all devices",
        "Advanced filtering and sorting options",
        "Course enrollment integration",
      ],
      challenges:
        "The main challenge was prompting the RAG agent to work as intended and understand the core request of the user. However, after adding more agents for context filtering, the agent was able to understand the user's request and provide the correct courses.",
      learnings:
        "Learned advanced AI/ML integration techniques such as RAG and Embeddings, improved my skills in building scalable search systems, and gained experience with modern frontend tooling like Vite.",
    },

    eureka: {
      name: "Eureka - Campus Buddy!",
      description:
        "An iOS social networking app designed to help college students find people with similar interests and organize hangouts on campus. Features location-based matching and real-time messaging.",
      technologies: [
        "Swift",
        "SwiftUI",
        "Firebase",
        "Core Location",
        "Push Notifications",
        "MapKit",
        "CloudKit",
      ],
      status: "completed",
      completedDate: "2023-11-20",
      liveUrl: "https://apps.apple.com/us/app/eureka-campus-buddy/id6470950630",
      githubUrl: "-",
      features: [
        "Location-based user discovery",
        "Interest-based matching algorithm",
        "Real-time messaging and chat",
        "Event creation and management",
        "Campus-specific filtering",
        "Push notifications for matches",
        "Profile customization with interests",
        "Safety features and user verification",
        "Integration with university databases",
        "Analytics dashboard for user engagement",
      ],
      challenges:
        "The biggest challenge was implementing a robust location-based matching system while ensuring user privacy and safety. Balancing real-time features with battery optimization was also crucial for mobile performance.",
      learnings:
        "Gained deep expertise in iOS development with Swift and SwiftUI, learned advanced Firebase integration techniques, and developed skills in location-based services and real-time communication systems.",
    },
    "portfolio-website": {
      name: "Portfolio Website",
      githubUrl: "https://github.com/macrohard/portfolio-website",
      liveUrl: "https://macrohard.com",
      description: "A portfolio website built with React and Tailwind CSS.",
      technologies: ["React", "Tailwind CSS"],
      status: "completed",
      completedDate: "2023-12-10",
      challenges:
        "The main challenge was to make the website look like Windows 95.",
      learnings: "Audio and Video integration in the website.",
      features: [
        "Windows 95 look and feel",
        "Audio and Video integration",
        "Responsive design",
        "Modern design",
        "User-friendly interface",
      ],
    },
    "Diamond Price Predictor (ML)": {
      name: "Diamond Price Predictor Model",
      liveUrl: "https://macrohard.com",
      githubUrl: "https://github.com/macrohard/diamond-price-predictor",
      description:
        "An end to end ML project where I trained a ML model to predict diamond prices with 97% accuracy using Grid-Search, Gradient Descent, ",
      technologies: [""],
      status: "completed",
      completedDate: "2023-12-10",
      features: [
        "Grid-Search",
        "Gradient Descent",
        "Linear Regression",
        "Polynomial Regression",
        "Ridge Regression",
      ],
      challenges:
        "The main Challenge was to understand the data and the features that were given to me and then train the model to predict the price of the diamond.",
      learnings:
        "Learned about the different types of Regression Models and how to use them to predict the price of the diamond.",
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
