import { planets, PlanetData } from "../data/planets";

interface PlanetSelectorProps {
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
}

export default function PlanetSelector({ selectedPlanet, onSelectPlanet }: PlanetSelectorProps) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      {planets.map((planet) => {
        const isSelected = selectedPlanet?.name === planet.name;
        return (
          <button
            key={planet.name}
            onClick={() => onSelectPlanet(isSelected ? null : planet)}
            className={`group relative flex items-center gap-2 transition-all duration-200 ${
              isSelected ? "scale-110" : "hover:scale-105"
            }`}
            title={planet.name}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                isSelected
                  ? "border-blue-400 bg-gray-800 shadow-lg shadow-blue-500/20"
                  : "border-gray-700 bg-gray-900/80 hover:border-gray-500"
              }`}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${Math.max(6, planet.size * 0.8)}px`,
                  height: `${Math.max(6, planet.size * 0.8)}px`,
                  background: `radial-gradient(circle at 35% 35%, ${lighten(planet.color)}, ${planet.color})`,
                }}
              />
            </div>
            <span
              className={`text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                isSelected
                  ? "text-white opacity-100"
                  : "text-gray-500 opacity-0 group-hover:opacity-100"
              }`}
            >
              {planet.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function lighten(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + 60);
  const g = Math.min(255, ((num >> 8) & 0xff) + 60);
  const b = Math.min(255, (num & 0xff) + 60);
  return `rgb(${r}, ${g}, ${b})`;
}
