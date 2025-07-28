import React from 'react';
import { User, Mail, MapPin, Calendar, Code, Heart } from 'lucide-react';

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
      <div className="flex-1 p-6">
        <div className="flex items-start space-x-6">
          {/* Profile Picture Placeholder */}
          <div className="win95-inset p-4 bg-gray-100">
            <User size={64} className="text-gray-600" />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-xl font-bold mb-2">John Developer</h1>
              <p className="text-sm text-gray-600 mb-4">
                Full-Stack Developer & UI/UX Enthusiast
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>john.dev@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Available for new opportunities</span>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-bold mb-2 flex items-center">
                <Code size={16} className="mr-2" />
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="win95-inset p-2 bg-gray-50">
                  <strong>Frontend:</strong><br />
                  React, TypeScript, Vue.js, HTML/CSS
                </div>
                <div className="win95-inset p-2 bg-gray-50">
                  <strong>Backend:</strong><br />
                  Node.js, Python, PostgreSQL, MongoDB
                </div>
                <div className="win95-inset p-2 bg-gray-50">
                  <strong>Tools:</strong><br />
                  Git, Docker, AWS, Figma
                </div>
                <div className="win95-inset p-2 bg-gray-50">
                  <strong>Other:</strong><br />
                  UI/UX Design, Agile, Testing
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <h3 className="font-bold mb-2 flex items-center">
            <Heart size={16} className="mr-2 text-red-500" />
            About Me
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            I'm a passionate developer with 5+ years of experience building web applications. 
            I love creating beautiful, functional interfaces and solving complex problems. 
            When I'm not coding, you can find me exploring new technologies, contributing to 
            open source projects, or enjoying the outdoors.
          </p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        Ready | Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};