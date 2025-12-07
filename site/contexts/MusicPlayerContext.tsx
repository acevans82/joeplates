'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export interface MusicTrack {
  id: string;
  label: string;
  startTime?: number; // Optional: start playback at this many seconds into the track
}

interface MusicPlayerContextType {
  isPlaying: boolean;
  currentTrack: MusicTrack | null;
  hasInteracted: boolean;
  playTrack: (track: MusicTrack) => void;
  togglePlayPause: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType>({
  isPlaying: false,
  currentTrack: null,
  hasInteracted: false,
  playTrack: () => {},
  togglePlayPause: () => {},
});

interface MusicPlayerProviderProps {
  children: ReactNode;
}

// Map track IDs to audio file paths in /public/audio/
const getAudioPath = (trackId: string): string => {
  return `/audio/${trackId}.mp3`;
};

export function MusicPlayerProvider({ children }: MusicPlayerProviderProps): ReactNode {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.loop = true; // Loop the track
      audioRef.current.volume = 0.3; // Set to 30% volume for background music
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play().catch((error: Error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const playTrack = (track: MusicTrack): void => {
    if (!audioRef.current) {
      return;
    }

    const audioPath = getAudioPath(track.id);

    // If switching to a different track, load new source
    if (!currentTrack || currentTrack.id !== track.id) {
      audioRef.current.src = audioPath;
      audioRef.current.load();
      
      // Set start time if specified
      if (track.startTime !== undefined) {
        // Use loadedmetadata event to set start time after load
        audioRef.current.addEventListener('loadedmetadata', () => {
          if (audioRef.current && track.startTime !== undefined) {
            audioRef.current.currentTime = track.startTime;
          }
        }, { once: true });
      }
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    setHasInteracted(true);
  };

  const togglePlayPause = (): void => {
    if (!currentTrack && !isPlaying) {
      return;
    }
    setIsPlaying((previous): boolean => !previous);
    setHasInteracted(true);
  };

  const value: MusicPlayerContextType = {
    isPlaying,
    currentTrack,
    hasInteracted,
    playTrack,
    togglePlayPause,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer(): MusicPlayerContextType {
  const context = useContext(MusicPlayerContext);
  return context;
}


