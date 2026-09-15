import { PlanetData } from "../data/planets";

interface PlanetInfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export default function PlanetInfoPanel({ planet, onClose }: PlanetInfoPanelProps) {
  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-20 animate-slideIn">
      {/* Header */}
      <div className="relative p-5 pb-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full shadow-lg"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${lighten(planet.color)}, ${planet.color}, ${darken(planet.color)})`,
              boxShadow: `0 0 20px ${planet.color}44`,
            }}
          />
          <div>
            <h2 className="text-xl font-bold text-white">{planet.name}</h2>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              {planet.type}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pb-3">
        <p className="text-sm text-gray-300 leading-relaxed">{planet.description}</p>
      </div>

      {/* Stats */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon="📏"
            label="Diameter"
            value={`${planet.diameter.toLocaleString()} km`}
          />
          <StatCard
            icon="☀️"
            label="Distance"
            value={`${planet.distanceFromSun} M km`}
          />
          <StatCard
            icon="🔄"
            label="Orbital Period"
            value={formatOrbitalPeriod(planet.orbitalPeriod)}
          />
          <StatCard
            icon="🌙"
            label="Moons"
            value={planet.moons.toString()}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
        {label}
      </div>
      <div className="text-sm text-white font-semibold mt-0.5">{value}</div>
    </div>
  );
}

function formatOrbitalPeriod(days: number): string {
  if (days < 365) {
    return `${days} days`;
  }
  const years = (days / 365.25).toFixed(1);
  return `${years} years`;
}

function lighten(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + 60);
  const g = Math.min(255, ((num >> 8) & 0xff) + 60);
  const b = Math.min(255, (num & 0xff) + 60);
  return `rgb(${r}, ${g}, ${b})`;
}

function darken(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - 50);
  const g = Math.max(0, ((num >> 8) & 0xff) - 50);
  const b = Math.max(0, (num & 0xff) - 50);
  return `rgb(${r}, ${g}, ${b})`;
}
