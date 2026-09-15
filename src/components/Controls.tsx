interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3 shadow-2xl z-20">
      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        )}
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-700" />

      {/* Speed Control */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Speed</span>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-28 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-xs text-blue-400 font-mono font-bold w-10 text-right">
          {speed.toFixed(1)}x
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-700" />

      {/* Speed presets */}
      <div className="flex gap-1">
        {[0.5, 1, 2, 5].map((preset) => (
          <button
            key={preset}
            onClick={() => onSpeedChange(preset)}
            className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all ${
              Math.abs(speed - preset) < 0.05
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {preset}x
          </button>
        ))}
      </div>
    </div>
  );
}
