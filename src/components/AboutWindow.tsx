import React from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Code,
  Heart,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";

export const AboutWindow: React.FC = () => {
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
        {/* Bio Section - Prominently at the top */}

        {/* Profile Section */}
        <div className="flex items-start space-x-6 mb-8">
          {/* Profile Picture */}
          <div className="win95-inset p-4 bg-gray-100 flex-shrink-0">
            <img
              src="/images/profile-pic.jpg"
              alt="Profile Picture"
              className="w-32 h-32 object-cover rounded"
              onError={(e) => {
                // Fallback to icon if image doesn't load
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const nextElement = target.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = "fl";
                }
              }}
            />
            <User size={128} className="text-gray-600 hidden" />
          </div>

          {/* Personal Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Zin Khant</h1>
              <p className="text-lg text-gray-600 mb-4">
                Software Engineering Intern | Computer Science Student
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-600" />
                <span>shanunapal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-green-600" />
                <span>Saint Paul, MN</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-purple-600" />
                <span>University of St. Thomas • Expected June 2027</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <button
                className="win95-button text-xs flex items-center space-x-1"
                onClick={() =>
                  window.open("https://github.com/ZinMK", "_blank")
                }
              >
                <Github size={12} />
                <span>GitHub</span>
              </button>
              <button
                className="win95-button text-xs flex items-center space-x-1"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/zin-khant-993055216/",
                    "_blank"
                  )
                }
              >
                <Linkedin size={12} />
                <span>LinkedIn</span>
              </button>
              <button
                className="win95-button text-xs flex items-center space-x-1"
                onClick={() =>
                  window.open("https://zinmk.com", "_blank")
                }
              >
                <Globe size={12} />
                <span>Website</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-bold mb-3 flex items-center text-lg">
            <Heart size={20} className="mr-2 text-red-500" />
            About Me
          </h3>
          <div className="win95-inset p-4 bg-gray-50">
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              I'm a Computer Science student at the University of St. Thomas with a passion for building impactful software solutions. Currently working as a Software Engineering Intern, I specialize in full-stack development, AI/ML integration, and creating scalable applications that solve real-world problems.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              My experience spans web development, mobile app creation, and AI-powered systems. I've architected reusable React components, engineered CI/CD pipelines, and developed automated testing suites that significantly improve development efficiency. I'm particularly interested in leveraging AI/ML technologies to create intelligent applications.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Beyond coding, I founded the Nexus AI Club at my university to help students learn about Large Language Models and host hackathons. I'm always excited to take on new challenges, learn cutting-edge technologies, and contribute to projects that make a meaningful impact.
            </p>
          </div>
        </div>
        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="font-bold mb-3 flex items-center text-lg">
            <Code size={20} className="mr-2" />
            Skills & Technologies
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-blue-600">Languages:</strong>
              <br />
              Python, Java, C, JavaScript, TypeScript, Go, HTML, CSS
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-green-600">Frameworks & Libraries:</strong>
              <br />
              React, Node.js, PyTorch, NumPy, Scikit-Learn, Pandas, Google ADK
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-purple-600">Tools & Platforms:</strong>
              <br />
              Docker, AWS (CodeCommit), Google Cloud Platform, Git, Salesforce, Pinecone, n8n
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-orange-600">Specializations:</strong>
              <br />
              CI/CD Pipelines, Test Automation, Web Development, AI/ML Integration, Mobile Development
            </div>
          </div>
        </div>

        {/* Recent Projects Summary */}
        <div>
          <h3 className="font-bold mb-3 flex items-center text-lg">
            <Globe size={20} className="mr-2" />
            Recent Projects
          </h3>
          <div className="space-y-3">
            <div className="win95-inset p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-blue-600">ClassFinder.ai</strong>
                  <p className="text-xs text-gray-600 mt-1">
                    NLP search tool parsing conversational queries for class schedules
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Completed
                </span>
              </div>
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="text-blue-600">
                    Eureka - Campus Social App
                  </strong>
                  <p className="text-xs text-gray-600 mt-1">
                    Mobile app for student hangouts with 64 active users, 200+ events
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        Ready | Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
