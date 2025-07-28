import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowProps {
  id: string;
  type: string;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  data?: any;
}

interface WindowManagerProps {
  windows: WindowProps[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onBringToFront: (id: string) => void;
  renderWindow: (window: WindowProps) => React.ReactNode;
}

export const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onClose,
  onMinimize,
  onBringToFront,
  renderWindow,
}) => {
  return (
    <>
      {windows
        .filter(window => !window.isMinimized)
        .map((window) => (
          <Window
            key={window.id}
            window={window}
            onClose={onClose}
            onMinimize={onMinimize}
            onBringToFront={onBringToFront}
          >
            {renderWindow(window)}
          </Window>
        ))}
    </>
  );
};

interface WindowComponentProps {
  window: WindowProps;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onBringToFront: (id: string) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowComponentProps> = ({
  window,
  onClose,
  onMinimize,
  onBringToFront,
  children,
}) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = React.useState({ x: isMobile ? 10 : 100, y: isMobile ? 20 : 100 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  // Handle both mouse and touch events
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    onBringToFront(window.id);
  };

  React.useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(globalThis.innerWidth - 300, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(globalThis.innerHeight - 200, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, dragOffset]);

  // Mobile-specific window dimensions
  const windowStyle = React.useMemo(() => {
    if (isMobile) {
      return {
        left: position.x,
        top: position.y,
        zIndex: window.zIndex,
        width: 'calc(100vw - 20px)',
        height: 'calc(100vh - 120px)',
        minWidth: '320px',
        minHeight: '200px',
        maxWidth: 'calc(100vw - 20px)',
        maxHeight: 'calc(100vh - 120px)',
      };
    }
    return {
      left: position.x,
      top: position.y,
      zIndex: window.zIndex,
      width: '600px',
      height: '400px',
      minWidth: '300px',
      minHeight: '200px',
    };
  }, [position, window.zIndex, isMobile]);

  return (
    <div
      className={`absolute win95-window ${isMobile ? 'mobile-window' : ''}`}
      style={windowStyle}
      onClick={() => onBringToFront(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`win95-titlebar cursor-move ${isMobile ? 'mobile-drag-handle' : ''}`}
        onPointerDown={handlePointerDown}
        style={{ touchAction: 'none' }}
      >
        <span className="truncate">{window.title}</span>
        <div className="flex space-x-1">
          {!isMobile && (
            <button
              className="w-6 h-6 win95-button text-xs flex items-center justify-center p-0"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(window.id);
              }}
            >
              <Minus size={10} />
            </button>
          )}
          <button 
            className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} win95-button text-xs flex items-center justify-center p-0`}
            onClick={(e) => {
              e.stopPropagation();
              isMobile ? onMinimize(window.id) : undefined;
            }}
          >
            <Square size={isMobile ? 12 : 8} />
          </button>
          <button
            className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'} win95-button text-xs flex items-center justify-center p-0`}
            onClick={(e) => {
              e.stopPropagation();
              onClose(window.id);
            }}
          >
            <X size={isMobile ? 12 : 10} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="bg-card p-0 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};