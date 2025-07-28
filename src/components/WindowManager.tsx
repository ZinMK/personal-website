import React from "react";
import { X, Minus, Square } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSound } from "@/hooks/use-sound";

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
        .filter((window) => !window.isMinimized)
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
  const { playClick, playError } = useSound();
  const [position, setPosition] = React.useState({
    x: isMobile ? 10 : 100,
    y: isMobile ? 20 : 100,
  });
  const [size, setSize] = React.useState(() => {
    // Use custom size if provided, otherwise use default
    const customSize = window.data?.customSize;
    if (customSize) {
      return customSize;
    }
    return {
      width: isMobile ? globalThis.innerWidth - 20 : 600,
      height: isMobile ? globalThis.innerHeight - 120 : 400,
    };
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] = React.useState("");
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Handle both mouse and touch events for dragging
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

  // Handle resize start
  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeDirection(direction);
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    onBringToFront(window.id);
  };

  React.useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const newX = Math.max(
          0,
          Math.min(globalThis.innerWidth - size.width, e.clientX - dragOffset.x)
        );
        const newY = Math.max(
          0,
          Math.min(
            globalThis.innerHeight - size.height,
            e.clientY - dragOffset.y
          )
        );
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = position.x;
        let newY = position.y;

        const minWidth = isMobile ? 320 : 300;
        const minHeight = 200;
        const maxWidth = globalThis.innerWidth - 20;
        const maxHeight = globalThis.innerHeight - 120;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(
            minWidth,
            Math.min(maxWidth - position.x, resizeStart.width + deltaX)
          );
        }
        if (resizeDirection.includes("w")) {
          const maxDeltaX = resizeStart.width - minWidth;
          const deltaXClamped = Math.max(
            -maxDeltaX,
            Math.min(position.x, deltaX)
          );
          newWidth = resizeStart.width - deltaXClamped;
          newX = position.x + deltaXClamped;
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(
            minHeight,
            Math.min(maxHeight - position.y, resizeStart.height + deltaY)
          );
        }
        if (resizeDirection.includes("n")) {
          const maxDeltaY = resizeStart.height - minHeight;
          const deltaYClamped = Math.max(
            -maxDeltaY,
            Math.min(position.y, deltaY)
          );
          newHeight = resizeStart.height - deltaYClamped;
          newY = position.y + deltaYClamped;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeStart,
    resizeDirection,
    size,
    position,
    isMobile,
  ]);

  // Window style with dynamic sizing
  const windowStyle = React.useMemo(() => {
    return {
      left: position.x,
      top: position.y,
      zIndex: window.zIndex,
      width: `${size.width}px`,
      height: `${size.height}px`,
      minWidth: isMobile ? "320px" : "300px",
      minHeight: "200px",
      maxWidth: isMobile ? "calc(100vw - 20px)" : "calc(100vw - 40px)",
      maxHeight: isMobile ? "calc(100vh - 120px)" : "calc(100vh - 40px)",
    };
  }, [position, size, window.zIndex, isMobile]);

  return (
    <div
      className={`absolute win95-window ${isMobile ? "mobile-window" : ""}`}
      style={windowStyle}
      onClick={() => onBringToFront(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`win95-titlebar cursor-move ${
          isMobile ? "mobile-drag-handle" : ""
        }`}
        onPointerDown={handlePointerDown}
        style={{ touchAction: "none" }}
      >
        <span className="truncate">{window.title}</span>
        <div className="flex space-x-1">
          {!isMobile && (
            <button
              className="w-6 h-6 win95-button text-xs flex items-center justify-center p-0"
              onPointerDown={(e) => {
                e.stopPropagation();
                playClick(); // Play click sound immediately
              }}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(window.id);
              }}
            >
              <Minus size={10} />
            </button>
          )}
          <button
            className={`${
              isMobile ? "w-8 h-8" : "w-6 h-6"
            } win95-button text-xs flex items-center justify-center p-0`}
            onPointerDown={(e) => {
              e.stopPropagation();
              playClick(); // Play click sound immediately
            }}
            onClick={(e) => {
              e.stopPropagation();
              isMobile ? onMinimize(window.id) : undefined;
            }}
          >
            <Square size={isMobile ? 12 : 8} />
          </button>
          <button
            className={`${
              isMobile ? "w-8 h-8" : "w-6 h-6"
            } win95-button text-xs flex items-center justify-center p-0`}
            onPointerDown={(e) => {
              e.stopPropagation();
              playClick(); // Play click sound immediately
            }}
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
      <div className="bg-card p-0 h-full overflow-auto">{children}</div>

      {/* Resize Handles */}
      {!isMobile && (
        <>
          {/* Corner resize handles */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onPointerDown={(e) => handleResizeStart(e, "se")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onPointerDown={(e) => handleResizeStart(e, "sw")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
            onPointerDown={(e) => handleResizeStart(e, "ne")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
            onPointerDown={(e) => handleResizeStart(e, "nw")}
            style={{ touchAction: "none" }}
          />

          {/* Edge resize handles */}
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize"
            onPointerDown={(e) => handleResizeStart(e, "s")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute top-0 left-4 right-4 h-2 cursor-n-resize"
            onPointerDown={(e) => handleResizeStart(e, "n")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute top-4 bottom-4 right-0 w-2 cursor-e-resize"
            onPointerDown={(e) => handleResizeStart(e, "e")}
            style={{ touchAction: "none" }}
          />
          <div
            className="absolute top-4 bottom-4 left-0 w-2 cursor-w-resize"
            onPointerDown={(e) => handleResizeStart(e, "w")}
            style={{ touchAction: "none" }}
          />
        </>
      )}
    </div>
  );
};
