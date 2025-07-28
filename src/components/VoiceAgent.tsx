import React, { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, MessageCircle, X, Volume2 } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({ isOpen, onClose }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [agentStatus, setAgentStatus] = useState<
    "idle" | "connecting" | "connected" | "speaking" | "listening"
  >("idle");
  const [transcript, setTranscript] = useState("");
  const [statusMessage, setStatusMessage] = useState("Ready to connect");
  const vapiRef = useRef<Vapi | null>(null);

  // VAPI configuration
  const VAPI_PUBLIC_KEY =
    import.meta.env.VITE_VAPI_API_KEY || "your-vapi-public-key-here";
  const VAPI_ASSISTANT_ID =
    import.meta.env.VITE_VAPI_ASSISTANT_ID || "your-vapi-assistant-id-here";

  useEffect(() => {
    console.log("VoiceAgent useEffect running");
    console.log("VAPI_PUBLIC_KEY:", VAPI_PUBLIC_KEY);
    console.log("VAPI_ASSISTANT_ID:", VAPI_ASSISTANT_ID);

    if (!VAPI_PUBLIC_KEY || VAPI_PUBLIC_KEY === "your-vapi-public-key-here") {
      console.log("VAPI_PUBLIC_KEY not configured");
      return;
    }

    console.log("Creating VAPI instance...");
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapiInstance;
    console.log("VAPI instance created:", vapiInstance);

    vapiInstance.on("call-start", () => {
      console.log("VAPI call-start event");
      setIsCallActive(true);
      setAgentStatus("connected");
      setStatusMessage("Connected");
      setTranscript("");
    });

    vapiInstance.on("call-end", () => {
      console.log("VAPI call-end event");
      setIsCallActive(false);
      setAgentStatus("idle");
      setStatusMessage("Ready to connect");
    });

    vapiInstance.on("speech-start", () => {
      console.log("VAPI speech-start event");
      setAgentStatus("speaking");
      setStatusMessage("Speaking");
    });

    vapiInstance.on("speech-end", () => {
      console.log("VAPI speech-end event");
      setAgentStatus("listening");
      setStatusMessage("Listening");
    });

    vapiInstance.on("message", (message) => {
      console.log("VAPI message event:", message);
      if (
        message.type === "transcript" &&
        message.transcriptType === "final" &&
        message.role === "user"
      ) {
        setTranscript((prev) => (prev + " " + message.transcript).trim());
      }
    });

    vapiInstance.on("error", (e) => {
      console.error("VAPI Error:", e);
      setAgentStatus("idle");
      setStatusMessage("Ready to connect");
      setIsCallActive(false);
    });

    return () => {
      console.log("Cleaning up VAPI instance");
      vapiInstance.stop();
    };
  }, [VAPI_PUBLIC_KEY]);

  const handleCallToggle = () => {
    console.log("handleCallToggle called");
    console.log("isCallActive:", isCallActive);
    console.log("vapiRef.current:", vapiRef.current);
    console.log("VAPI_PUBLIC_KEY:", VAPI_PUBLIC_KEY);
    console.log("VAPI_ASSISTANT_ID:", VAPI_ASSISTANT_ID);

    if (vapiRef.current) {
      if (isCallActive) {
        console.log("Stopping call...");
        vapiRef.current.stop();
      } else {
        if (
          !VAPI_ASSISTANT_ID ||
          VAPI_ASSISTANT_ID === "your-vapi-assistant-id-here"
        ) {
          console.log("VAPI_ASSISTANT_ID not configured");
          setStatusMessage("Not configured");
          return;
        }
        console.log("Starting call...");
        setAgentStatus("connecting");
        setStatusMessage("Connecting");
        vapiRef.current.start(VAPI_ASSISTANT_ID);
      }
    } else {
      console.log("vapiRef.current is null");
      setStatusMessage("Not initialized");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="win95-window bg-card border-2 shadow-lg rounded-none">
        {/* Title Bar */}
        <div className="win95-titlebar flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 size={16} />
            <span className="font-bold">Voice Assistant</span>
          </div>
          <button
            onClick={() => {
              vapiRef.current?.stop();
              onClose();
            }}
            className="win95-button"
            style={{
              width: "24px",
              height: "24px",
              minWidth: "auto",
              padding: 0,
            }}
          >
            <X size={12} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 min-w-80">
          {/* Status Display */}
          <div className="mb-4 win95-inset p-2 flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full ${
                agentStatus === "listening" && isCallActive
                  ? "bg-green-500 animate-pulse"
                  : agentStatus === "connected"
                  ? "bg-green-500"
                  : agentStatus === "connecting"
                  ? "bg-yellow-500"
                  : agentStatus === "speaking"
                  ? "bg-blue-500"
                  : "bg-gray-400"
              }`}
            />
            <span className="text-sm font-semibold">{statusMessage}</span>
          </div>

          {/* Transcript Area */}
          <div className="mb-4 p-3 bg-white win95-inset h-32 overflow-y-auto text-sm">
            {transcript ? (
              <span>{transcript}</span>
            ) : (
              <span className="text-gray-500">
                Transcript will appear here...
              </span>
            )}
          </div>

          {/* Call Controls */}
          <div className="space-y-3">
            <button
              onClick={handleCallToggle}
              className="win95-button w-full flex items-center justify-center space-x-2 py-2"
            >
              {isCallActive ? (
                <>
                  <PhoneOff size={16} className="text-red-500" />
                  <span>End Call</span>
                </>
              ) : (
                <>
                  <Phone size={16} className="text-green-500" />
                  <span>Start Call</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
