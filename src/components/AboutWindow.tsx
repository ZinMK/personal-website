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
              <h1 className="text-2xl font-bold mb-2">Zin Min Khant</h1>
              <p className="text-lg text-gray-600 mb-4">
                Full-Stack AI/ML Dev{" "}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-600" />
                <span>shanunapal@email.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-green-600" />
                <span>Saint Paul, MN</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-purple-600" />
                <span>Available for new opportunities</span>
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
                  window.open("https://johndeveloper.dev", "_blank")
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
              I'm a passionate full-stack developer with expertise in modern web
              technologies and mobile app development. I specialize in creating
              intelligent applications that solve real-world problems, from
              AI-powered course finding systems to social networking apps for
              college campuses.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              My journey in tech started with web development and has evolved to
              include iOS development, AI/ML integration, and building scalable
              systems. I love working with cutting-edge technologies and
              creating user experiences that make a difference in people's
              lives.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or sharing knowledge with
              the developer community. I'm always excited to take on new
              challenges and learn something new.
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
              <strong className="text-blue-600">Frontend Development:</strong>
              <br />
              React, TypeScript, Vue.js, Swift/SwiftUI, HTML/CSS, Tailwind CSS,
              Vite
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-green-600">Backend Development:</strong>
              <br />
              Node.js, Python, Express, Firebase, PostgreSQL, MongoDB, REST APIs
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-purple-600">AI/ML & Cloud:</strong>
              <br />
              AI/ML Integration, Google Cloud Platform, Vertex AI, RAG Systems,
              Embeddings
            </div>
            <div className="win95-inset p-3 bg-gray-50">
              <strong className="text-orange-600">Tools & Platforms:</strong>
              <br />
              Git, Docker, AWS, iOS Development, Push Notifications, MapKit,
              CloudKit
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
                    AI-powered course finding agent
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
                    Eureka - Campus Buddy!
                  </strong>
                  <p className="text-xs text-gray-600 mt-1">
                    iOS social networking app for college students
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
                    Diamond Price Predictor
                  </strong>
                  <p className="text-xs text-gray-600 mt-1">
                    ML model with 97% accuracy
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
