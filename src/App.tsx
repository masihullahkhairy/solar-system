import { useState } from "react";
import SolarSystemCanvas from "./components/SolarSystemCanvas";
import PlanetInfoPanel from "./components/PlanetInfoPanel";
import Controls from "./components/Controls";
import PlanetSelector from "./components/PlanetSelector";
import { PlanetData } from "./data/planets";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <div className="w-screen h-screen bg-[#0a0a1a] overflow-hidden relative select-none">
      {/* Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <span className="text-3xl">🪐</span> Solar System Explorer
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Click on any planet to learn more • Use controls to adjust speed
        </p>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <SolarSystemCanvas
          isPlaying={isPlaying}
          speed={speed}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={setSelectedPlanet}
        />
      </div>

      {/* Planet Selector Sidebar */}
      <PlanetSelector
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />

      {/* Planet Info Panel */}
      <PlanetInfoPanel
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}
