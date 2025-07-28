import React, { useState } from "react";
import {
  HardDrive,
  FolderOpen,
  FileText,
  User,
  Briefcase,
  Mail,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Taskbar } from "./Taskbar";
import { WindowManager } from "./WindowManager";
import { ProjectsWindow } from "./ProjectsWindow";
import { AboutWindow } from "./AboutWindow";
import { ProjectDetailWindow } from "./ProjectDetailWindow";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSound } from "@/hooks/use-sound";

// Custom Windows 95-style icon components
const MyComputerIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <rect
      x="4"
      y="6"
      width="24"
      height="20"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="8"
      y="10"
      width="16"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <rect x="12" y="22" width="8" height="2" fill="currentColor" />
  </svg>
);

const ProjectsIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <path d="M6 4h20v24H6z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M6 4h20v6H6z" fill="currentColor" />
    <rect x="10" y="14" width="12" height="2" fill="currentColor" />
    <rect x="10" y="18" width="8" height="2" fill="currentColor" />
    <rect x="10" y="22" width="10" height="2" fill="currentColor" />
  </svg>
);

const AboutIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <circle
      cx="16"
      cy="10"
      r="6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="16"
      cy="16"
      r="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const ReadmeIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <path
      d="M8 4h12l4 4v20H8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M20 4v4h4" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="10" y="12" width="12" height="2" fill="currentColor" />
    <rect x="10" y="16" width="8" height="2" fill="currentColor" />
    <rect x="10" y="20" width="10" height="2" fill="currentColor" />
    <rect x="10" y="24" width="6" height="2" fill="currentColor" />
  </svg>
);

// Alternative: Image-based icon component
const ImageIcon = ({ src, size = 32, className = "" }) => (
  <img src={src} width={size} height={size} className={className} alt="" />
);

export const Desktop = () => {
  const isMobile = useIsMobile();
  const { playClick, playDoubleClick, playWindowOpen } = useSound();
  const [windows, setWindows] = useState<
    Array<{
      id: string;
      type: string;
      title: string;
      isMinimized: boolean;
      zIndex: number;
      data?: any;
    }>
  >([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  const openWindow = (type: string, title: string, data?: any) => {
    playWindowOpen();
    const id = `${type}-${Date.now()}`;
    const newWindow = {
      id,
      type,
      title,
      isMinimized: false,
      zIndex: nextZIndex,
      data,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
    // Play window open sound
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window
      )
    );
  };

  const restoreWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id
          ? { ...window, isMinimized: false, zIndex: nextZIndex }
          : window
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, zIndex: nextZIndex } : window
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const desktopIcons = [
    {
      id: "projects",
      icon: (props) => <ImageIcon src="/icons/folder.png" {...props} />,
      label: "Projects",
      action: () => openWindow("projects", "Projects"),
    },
    {
      id: "about",
      icon: (props) => <ImageIcon src="/icons/aboutme.png" {...props} />,
      label: "About Me",
      action: () => openWindow("about", "About Me"),
    },
    { id: "readme", icon: ReadmeIcon, label: "README.txt", action: () => {} },
    {
      id: "contact",
      icon: (props) => <ImageIcon src="/icons/gmail.png" {...props} />,
      label: "Contact",
      action: () => {},
    },
    { id: "settings", icon: Settings, label: "Settings", action: () => {} },
    { id: "help", icon: HelpCircle, label: "Help", action: () => {} },
  ];

  const handleIconClick = (action: () => void) => {
    if (isMobile) {
      // On mobile, single tap opens
      playClick(); // Play click sound immediately
      action();
    }
  };

  const handleIconDoubleClick = (action: () => void) => {
    if (!isMobile) {
      // On desktop, double click opens
      playDoubleClick(); // Play double click sound immediately
      action();
    }
  };

  const handleIconPointerDown = (
    action: () => void,
    isDoubleClick: boolean = false
  ) => {
    // Play sound immediately on pointer down for faster response
    if (isDoubleClick && !isMobile) {
      playDoubleClick();
    } else if (isMobile) {
      playClick();
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 relative overflow-hidden">
      {/* Desktop Icons */}
      <div
        className={`absolute top-4 left-4 ${
          isMobile ? "grid grid-cols-2 gap-4" : "space-y-2"
        }`}
      >
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="desktop-icon"
            data-icon-type={
              icon.id === "my-computer"
                ? "computer"
                : icon.id === "projects"
                ? "folder"
                : icon.id === "readme"
                ? "document"
                : icon.id === "about"
                ? "user"
                : "default"
            }
            onPointerDown={() => handleIconPointerDown(icon.action, !isMobile)}
            onClick={() => handleIconClick(icon.action)}
            onDoubleClick={() => handleIconDoubleClick(icon.action)}
            style={{ touchAction: "manipulation" }}
          >
            <icon.icon size={isMobile ? 56 : 75} className="mb-1" />
            <span className="text-center leading-tight">{icon.label}</span>
          </div>
        ))}
      </div>

      {/* Windows */}
      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onBringToFront={bringToFront}
        renderWindow={(window) => {
          switch (window.type) {
            case "projects":
              return (
                <ProjectsWindow
                  onOpenProject={(project) =>
                    openWindow("project", project.name, {
                      projectId: project.id,
                    })
                  }
                />
              );
            case "about":
              return <AboutWindow />;
            case "project":
              return (
                <ProjectDetailWindow
                  projectId={window.data?.projectId || "portfolio-website"}
                />
              );
            default:
              return <div className="p-4">Unknown window type</div>;
          }
        }}
      />

      {/* Taskbar */}
      <Taskbar windows={windows} onWindowClick={restoreWindow} />
    </div>
  );
};
