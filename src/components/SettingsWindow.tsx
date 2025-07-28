import React, { useState, useEffect } from "react";
import {
  Settings,
  Type,
  Palette,
  Monitor,
  Save,
  RotateCcw,
} from "lucide-react";

interface SettingsWindowProps {
  onSettingsChange?: (settings: AppSettings) => void;
}

interface AppSettings {
  fontSize: "small" | "medium" | "large";
  backgroundColor: "default" | "blue" | "green" | "purple" | "custom";
  customBackgroundColor?: string;
}

export const SettingsWindow: React.FC<SettingsWindowProps> = ({
  onSettingsChange,
}) => {
  const [settings, setSettings] = useState<AppSettings>({
    fontSize: "medium",
    backgroundColor: "default",
  });

  const [customColor, setCustomColor] = useState("#87CEEB");

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        if (parsed.customBackgroundColor) {
          setCustomColor(parsed.customBackgroundColor);
        }
      } catch (error) {
        console.warn("Failed to load settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("app-settings", JSON.stringify(settings));
    if (onSettingsChange) {
      onSettingsChange(settings);
    }
  }, [settings, onSettingsChange]);

  const handleFontSizeChange = (size: "small" | "medium" | "large") => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const handleBackgroundColorChange = (
    color: "default" | "blue" | "green" | "purple" | "custom"
  ) => {
    setSettings((prev) => ({
      ...prev,
      backgroundColor: color,
      customBackgroundColor: color === "custom" ? customColor : undefined,
    }));
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    if (settings.backgroundColor === "custom") {
      setSettings((prev) => ({
        ...prev,
        customBackgroundColor: color,
      }));
    }
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      fontSize: "medium" as const,
      backgroundColor: "default" as const,
    };
    setSettings(defaultSettings);
    setCustomColor("#87CEEB");
  };

  const getBackgroundColorClass = () => {
    switch (settings.backgroundColor) {
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

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

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
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 flex items-center justify-center">
              <Settings size={24} className="mr-2" />
              Settings
            </h1>
            <p className="text-sm text-gray-600">
              Customize your Windows 95 experience
            </p>
          </div>

          {/* Font Size Settings */}
          <div className="win95-inset p-4 bg-gray-50">
            <h3 className="font-bold mb-4 flex items-center">
              <Type size={18} className="mr-2" />
              Font Size
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="font-small"
                  name="fontSize"
                  checked={settings.fontSize === "small"}
                  onChange={() => handleFontSizeChange("small")}
                  className="win95-checkbox"
                />
                <label htmlFor="font-small" className="text-sm cursor-pointer">
                  Small
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="font-medium"
                  name="fontSize"
                  checked={settings.fontSize === "medium"}
                  onChange={() => handleFontSizeChange("medium")}
                  className="win95-checkbox"
                />
                <label
                  htmlFor="font-medium"
                  className="text-base cursor-pointer"
                >
                  Medium (Default)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="font-large"
                  name="fontSize"
                  checked={settings.fontSize === "large"}
                  onChange={() => handleFontSizeChange("large")}
                  className="win95-checkbox"
                />
                <label htmlFor="font-large" className="text-lg cursor-pointer">
                  Large
                </label>
              </div>
            </div>
          </div>

          {/* Background Color Settings */}
          <div className="win95-inset p-4 bg-gray-50">
            <h3 className="font-bold mb-4 flex items-center">
              <Palette size={18} className="mr-2" />
              Background Color
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-default"
                  name="backgroundColor"
                  checked={settings.backgroundColor === "default"}
                  onChange={() => handleBackgroundColorChange("default")}
                  className="win95-checkbox"
                />
                <label htmlFor="bg-default" className="text-sm cursor-pointer">
                  Default (Cyan)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-blue"
                  name="backgroundColor"
                  checked={settings.backgroundColor === "blue"}
                  onChange={() => handleBackgroundColorChange("blue")}
                  className="win95-checkbox"
                />
                <label htmlFor="bg-blue" className="text-sm cursor-pointer">
                  Blue
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-green"
                  name="backgroundColor"
                  checked={settings.backgroundColor === "green"}
                  onChange={() => handleBackgroundColorChange("green")}
                  className="win95-checkbox"
                />
                <label htmlFor="bg-green" className="text-sm cursor-pointer">
                  Green
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-purple"
                  name="backgroundColor"
                  checked={settings.backgroundColor === "purple"}
                  onChange={() => handleBackgroundColorChange("purple")}
                  className="win95-checkbox"
                />
                <label htmlFor="bg-purple" className="text-sm cursor-pointer">
                  Purple
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-custom"
                  name="backgroundColor"
                  checked={settings.backgroundColor === "custom"}
                  onChange={() => handleBackgroundColorChange("custom")}
                  className="win95-checkbox"
                />
                <label htmlFor="bg-custom" className="text-sm cursor-pointer">
                  Custom Color
                </label>
                {settings.backgroundColor === "custom" && (
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="win95-inset p-4 bg-gray-50">
            <h3 className="font-bold mb-4 flex items-center">
              <Monitor size={18} className="mr-2" />
              Preview
            </h3>
            <div
              className={`w-full h-20 rounded border-2 border-dashed border-gray-400 flex items-center justify-center ${getBackgroundColorClass()}`}
              style={
                settings.backgroundColor === "custom"
                  ? { backgroundColor: customColor }
                  : {}
              }
            >
              <span className={`text-white font-bold ${getFontSizeClass()}`}>
                Preview Text
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 justify-center">
            <button
              className="win95-button text-sm flex items-center space-x-2 px-4 py-2"
              onClick={resetToDefaults}
            >
              <RotateCcw size={16} />
              <span>Reset to Defaults</span>
            </button>
            <button
              className="win95-button text-sm flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white"
              onClick={() => {
                // Settings are auto-saved, just show confirmation
                alert("Settings saved successfully!");
              }}
            >
              <Save size={16} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="win95-inset p-1 text-xs bg-card border-t">
        Settings saved automatically | Last updated:{" "}
        {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
