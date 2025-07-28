import { useCallback, useRef, useState, useEffect } from "react";

interface SoundOptions {
  volume?: number;
  playbackRate?: number;
}

interface AudioPool {
  [key: string]: HTMLAudioElement[];
}

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioPoolRef = useRef<AudioPool>({});
  const preloadedAudioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Preload common sounds for instant playback
  useEffect(() => {
    const soundsToPreload = [
      "/sounds/click.wav",
      "/sounds/double-click.wav",
      "/sounds/open.wav",
      "/sounds/error.wav",
      "/sounds/startup.wav",
    ];

    soundsToPreload.forEach((soundPath) => {
      const audio = new Audio(soundPath);
      audio.preload = "auto";
      preloadedAudioRef.current[soundPath] = audio;
    });
  }, []);

  const getAudioFromPool = useCallback(
    (soundPath: string): HTMLAudioElement => {
      // Check if we have a preloaded audio
      if (preloadedAudioRef.current[soundPath]) {
        const audio = preloadedAudioRef.current[soundPath];
        // Clone the preloaded audio for immediate playback
        const clonedAudio = audio.cloneNode() as HTMLAudioElement;
        return clonedAudio;
      }

      // Fallback to creating new audio
      return new Audio(soundPath);
    },
    []
  );

  const playSound = useCallback(
    (soundPath: string, options: SoundOptions = {}) => {
      if (!isSoundEnabled) return; // Don't play sound if disabled

      try {
        // Get audio from pool or create new one
        const audio = getAudioFromPool(soundPath);

        // Set options
        if (options.volume !== undefined) {
          audio.volume = Math.max(0, Math.min(1, options.volume));
        }
        if (options.playbackRate !== undefined) {
          audio.playbackRate = Math.max(0.1, Math.min(4, options.playbackRate));
        }

        // Reset audio to beginning for immediate playback
        audio.currentTime = 0;

        // Play the sound immediately
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Failed to play sound:", error);
          });
        }

        // Clean up after playing
        audio.addEventListener(
          "ended",
          () => {
            audio.remove();
          },
          { once: true }
        );
      } catch (error) {
        console.warn("Error playing sound:", error);
      }
    },
    [isSoundEnabled, getAudioFromPool]
  );

  // Predefined sounds for Windows 95 experience
  const playClick = useCallback(() => {
    playSound("/sounds/click.wav", { volume: 0.3 });
  }, [playSound]);

  const playDoubleClick = useCallback(() => {
    playSound("/sounds/double-click.wav", { volume: 0.4 });
  }, [playSound]);

  const playWindowOpen = useCallback(() => {
    playSound("/sounds/open.wav", { volume: 0.9 });
  }, [playSound]);

  const playError = useCallback(() => {
    playSound("/sounds/error.wav", { volume: 0.4 });
  }, [playSound]);

  const playStartup = useCallback(() => {
    playSound("/sounds/startup.wav", { volume: 0.6 });
  }, [playSound]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  return {
    playSound,
    playClick,
    playDoubleClick,
    playWindowOpen,
    playError,
    playStartup,
    isSoundEnabled,
    toggleSound,
  };
};
