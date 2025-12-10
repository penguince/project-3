import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

/**
 * AudioPlayer Component
 * Plays background music with user control to toggle on/off
 * Persists user preference in localStorage
 * 
 * @param {Object} props
 * @param {string} props.src - Path to the audio file
 */
function AudioPlayer({ src = '/digimon-theme.mp3' }) {
  // Check localStorage for user's previous preference (default: true for autoplay)
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('bgMusicEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Handle autoplay restrictions - browsers require user interaction first
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Play or pause based on state and user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && hasInteracted) {
      audio.play().catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, hasInteracted]);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('bgMusicEnabled', JSON.stringify(isPlaying));
  }, [isPlaying]);

  // Toggle music on/off
  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />
      <button
        className={`audio-toggle ${isPlaying ? 'playing' : 'paused'}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Click to mute' : 'Click to play music'}
      >
        <span className="audio-icon">
          {isPlaying ? '🔊' : '🔇'}
        </span>
        <span className="audio-text">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
        {!hasInteracted && isPlaying && (
          <span className="audio-hint">Click anywhere to start</span>
        )}
      </button>
    </div>
  );
}

export default AudioPlayer;
