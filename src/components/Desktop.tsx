import React, { useState, useEffect } from "react";
import { HardDrive, Briefcase, Mail, Settings, HelpCircle } from "lucide-react";
import { Desktop as DesktopComponent } from "./Desktop";
import { WindowManager } from "./WindowManager";
import { ProjectsWindow } from "./ProjectsWindow";
import { AboutWindow } from "./AboutWindow";
import { ProjectDetailWindow } from "./ProjectDetailWindow";
import { SettingsWindow } from "./SettingsWindow";
import { Taskbar } from "./Taskbar";
import { useIsMobile } from "../hooks/use-mobile";
import { useSound } from "../hooks/use-sound";

// Custom SVG Icons
const MyComputerIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const ProjectsIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="7" y="7" width="10" height="10" />
  </svg>
);

const AboutIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ReadmeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

// Generic Image Icon Component
const ImageIcon = ({ src, ...props }: { src: string; [key: string]: any }) => (
  <img
    src={src}
    alt="icon"
    {...props}
    className={`w-full h-full object-contain ${props.className || ""}`}
  />
);

interface AppSettings {
  fontSize: "small" | "medium" | "large";
  backgroundColor: "default" | "blue" | "green" | "purple" | "custom";
  customBackgroundColor?: string;
}

export const Desktop = () => {
  const isMobile = useIsMobile();
  const { playClick, playDoubleClick, playWindowOpen, playStartup } =
    useSound();
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
  const [hasPlayedStartup, setHasPlayedStartup] = useState(false);
  const [isStartingUp, setIsStartingUp] = useState(true);
  const [appSettings, setAppSettings] = useState<AppSettings>({
    fontSize: "medium",
    backgroundColor: "default",
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setAppSettings(parsed);
      } catch (error) {
        console.warn("Failed to load settings:", error);
      }
    }
  }, []);

  // Apply settings to the document
  useEffect(() => {
    const root = document.documentElement;

    // Apply font size
    root.style.fontSize =
      appSettings.fontSize === "small"
        ? "14px"
        : appSettings.fontSize === "large"
        ? "18px"
        : "16px";

    // Apply background color
    const getBackgroundClass = () => {
      switch (appSettings.backgroundColor) {
        case "blue":
          return "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500";
        case "green":
          return "bg-gradient-to-br from-green-300 via-green-400 to-green-500";
        case "purple":
          return "bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500";
        case "custom":
          return "";
        default:
          return "bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500";
      }
    };

    const mainDiv = document.querySelector(".desktop-main") as HTMLElement;
    if (mainDiv) {
      // Remove all background classes
      mainDiv.className = mainDiv.className.replace(
        /bg-gradient-to-br\s+from-\w+-\d+\s+via-\w+-\d+\s+to-\w+-\d+/g,
        ""
      );

      if (
        appSettings.backgroundColor === "custom" &&
        appSettings.customBackgroundColor
      ) {
        mainDiv.style.background = appSettings.customBackgroundColor;
        mainDiv.style.backgroundImage = "none";
      } else {
        mainDiv.style.background = "";
        mainDiv.style.backgroundImage = "";
        const backgroundClasses = getBackgroundClass().split(" ");
        backgroundClasses.forEach((className) => {
          if (className) {
            mainDiv.classList.add(className);
          }
        });
      }
    }
  }, [appSettings]);

  // Play startup sound when component first loads
  React.useEffect(() => {
    if (hasPlayedStartup) return; // Only play once

    // Initialize audio context and play startup sound
    const initializeAudio = async () => {
      try {
        // Small delay to ensure everything is loaded
        await new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
          playStartup();
          setHasPlayedStartup(true);
        });

        // Play startup sound

        // End startup animation after sound plays
        setTimeout(() => {
          setIsStartingUp(false);
        }, 1000); // Adjust timing based on your startup sound duration
      } catch (error) {
        console.warn("Failed to play startup sound:", error);
        setIsStartingUp(false);
      }
    };

    initializeAudio();
  }, [playStartup, hasPlayedStartup]);

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
    {
      id: "contact",
      icon: (props) => <ImageIcon src="/icons/gmail.png" {...props} />,
      label: "Contact",
      action: () => {},
    },
    {
      id: "settings",
      icon: (props) => <ImageIcon src="/icons/gear.png" {...props} />,
      label: "Site Settings",
      action: () => openWindow("settings", "Settings"),
    },
  ];

  const openWindow = (type: string, title: string, data?: any) => {
    playWindowOpen();
    const id = `${type}-${Date.now()}`;

    // Set custom window sizes based on type
    let customSize = { width: 600, height: 400 };
    if (type === "about") {
      customSize = { width: 800, height: 700 }; // Larger size for About window
    } else if (type === "projects") {
      customSize = { width: 700, height: 500 }; // Medium size for Projects window
    } else if (type === "project") {
      customSize = { width: 750, height: 600 }; // Large size for Project details
    } else if (type === "settings") {
      customSize = { width: 600, height: 700 }; // Medium size for Settings window
    }

    const newWindow = {
      id,
      type,
      title,
      isMinimized: false,
      zIndex: nextZIndex,
      data: { ...data, customSize }, // Pass custom size in data
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
        window.id === id ? { ...window, isMinimized: false } : window
      )
    );
  };

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, zIndex: nextZIndex } : window
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const handleIconClick = (action: () => void) => {
    // Single click does nothing - only for visual feedback
    // Icons only open on double-click
  };

  const handleIconDoubleClick = (action: () => void) => {
    // Double-click opens the icon (works on both mobile and desktop)
    action();
  };

  const handleIconPointerDown = (
    action: () => void,
    isDoubleClick: boolean
  ) => {
    // Play sound on pointer down for immediate feedback
    if (isDoubleClick) {
      playDoubleClick();
    }
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
  };

  return (
    <div
      className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 high-quality-bg desktop-main"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Startup Overlay */}
      {isStartingUp && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg shadow-lg text-center">
            <div className="text-2xl font-bold mb-4 text-primary">
              Zindows 25
            </div>
            <div className="text-sm text-muted-foreground">Starting up...</div>
            <div className="mt-4 w-32 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
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
            case "settings":
              return <SettingsWindow onSettingsChange={handleSettingsChange} />;
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
