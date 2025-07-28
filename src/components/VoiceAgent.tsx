import React, { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, MessageCircle, X } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
}
//'uyo"
export const VoiceAgent: React.FC<VoiceAgentProps> = ({ isOpen, onClose }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [agentStatus, setAgentStatus] = useState<
    "idle" | "connecting" | "connected" | "speaking" | "listening"
  >("idle");
  const [transcript, setTranscript] = useState("");
  const vapiRef = useRef<Vapi | null>(null);

  // VAPI configuration - you'll need to set these up in your .env file
  const VAPI_API_KEY =
    import.meta.env.VITE_VAPI_API_KEY || "your-vapi-public-key-here";
  const VAPI_ASSISTANT_ID =
    import.meta.env.VITE_VAPI_ASSISTANT_ID || "your-vapi-assistant-id-here";

  useEffect(() => {
    if (!VAPI_API_KEY || VAPI_API_KEY === "your-vapi-public-key-here") {
      console.error("VAPI API key is not set up.");
      return;
    }

    const vapiInstance = new Vapi(VAPI_API_KEY);
    vapiRef.current = vapiInstance;

    vapiInstance.on("call-start", () => {
      setAgentStatus("connected");
      setIsCallActive(true);
      setTranscript("");
    });

    vapiInstance.on("call-end", () => {
      setAgentStatus("idle");
      setIsCallActive(false);
      setTranscript("");
    });

    vapiInstance.on("speech-start", () => {
      setAgentStatus("speaking");
    });

    vapiInstance.on("speech-end", () => {
      setAgentStatus("listening");
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => prev + " " + message.transcript);
      }
    });

    vapiInstance.on("error", (e) => {
      console.error(e);
      setAgentStatus("idle");
      setIsCallActive(false);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [VAPI_API_KEY]);

  const handleCallToggle = () => {
    if (isCallActive) {
      vapiRef.current?.stop();
    } else {
      if (
        !VAPI_ASSISTANT_ID ||
        VAPI_ASSISTANT_ID === "your-vapi-assistant-id-here"
      ) {
        alert(
          "Please set up your VAPI Assistant ID in the environment variables (VITE_VAPI_ASSISTANT_ID)"
        );
        return;
      }
      setAgentStatus("connecting");
      vapiRef.current?.start(VAPI_ASSISTANT_ID);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="win95-window bg-white border-2 border-gray-400 shadow-lg rounded-none">
        {/* Title Bar */}
        <div className="win95-titlebar bg-blue-600 text-white p-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle size={16} />
            <span className="text-sm font-bold">Voice Assistant</span>
          </div>
          <button
            onClick={() => {
              vapiRef.current?.stop();
              onClose();
            }}
            className="w-6 h-6 win95-button text-xs flex items-center justify-center p-0"
          >
            <X size={12} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 bg-gray-50 min-w-80">
          {/* Status Display */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  agentStatus === "connected" || agentStatus === "listening"
                    ? "bg-green-500"
                    : agentStatus === "connecting"
                    ? "bg-yellow-500"
                    : agentStatus === "speaking"
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
              />
              <span className="text-sm font-medium">
                {agentStatus === "connected"
                  ? "Connected"
                  : agentStatus === "connecting"
                  ? "Connecting..."
                  : agentStatus === "speaking"
                  ? "Speaking"
                  : agentStatus === "listening"
                  ? "Listening"
                  : "Ready to Connect"}
              </span>
            </div>
          </div>

          {/* Transcript */}
          <div className="mb-4 p-3 bg-white border win95-inset h-24 overflow-y-auto">
            <p className="text-sm text-gray-800">
              {transcript || "Transcript will appear here..."}
            </p>
          </div>

          {/* Call Controls */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <button
                onClick={handleCallToggle}
                className="win95-button flex-1 flex items-center justify-center space-x-2 py-2"
              >
                {isCallActive ? (
                  <>
                    <PhoneOff size={16} />
                    <span>End Call</span>
                  </>
                ) : (
                  <>
                    <Phone size={16} />
                    <span>Start Voice Chat</span>
                  </>
                )}
              </button>
            </div>

            {/* VAPI Setup Info */}
            {(!VAPI_API_KEY ||
              VAPI_API_KEY === "your-vapi-public-key-here" ||
              !VAPI_ASSISTANT_ID ||
              VAPI_ASSISTANT_ID === "your-vapi-assistant-id-here") && (
              <div className="text-xs text-red-600 bg-red-50 p-2 border border-red-200 rounded">
                <p className="font-medium">VAPI Setup Required:</p>
                <p>1. Get your Public Key and Assistant ID from vapi.ai</p>
                <p>2. Add to .env: VITE_VAPI_PUBLIC_KEY=your_key</p>
                <p>3. Add to .env: VITE_VAPI_ASSISTANT_ID=your_id</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
