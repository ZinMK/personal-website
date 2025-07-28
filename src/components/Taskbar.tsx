import React from 'react';
import { Flag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TaskbarProps {
  windows: Array<{
    id: string;
    type: string;
    title: string;
    isMinimized: boolean;
    zIndex: number;
  }>;
  onWindowClick: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick }) => {
  const isMobile = useIsMobile();
  const activeWindows = windows.filter(window => !window.isMinimized);

  return (
    <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'h-14' : 'h-10'} win95-taskbar flex items-center px-2 space-x-1`}>
      {/* Start Button */}
      <button className={`win95-button flex items-center space-x-1 font-bold ${isMobile ? 'text-sm' : ''}`}>
        <Flag size={isMobile ? 16 : 14} />
        <span>Start</span>
      </button>

      {/* Window Tasks */}
      <div className="flex-1 flex space-x-1 overflow-x-auto">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`win95-button ${isMobile ? 'text-sm px-3 py-2' : 'text-xs px-2 py-1'} ${
              isMobile ? 'max-w-24' : 'max-w-32'
            } truncate ${window.isMinimized ? 'opacity-75' : ''} flex-shrink-0`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className={`win95-inset px-2 py-1 ${isMobile ? 'text-sm' : 'text-xs'} flex-shrink-0`}>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};