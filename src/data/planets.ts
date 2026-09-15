export interface PlanetData {
  name: string;
  diameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  color: string;
  orbitRadius: number; // pixels for display
  size: number; // pixels for display
  description: string;
  moons: number;
  type: string;
}

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    color: "#b5b5b5",
    orbitRadius: 70,
    size: 5,
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    moons: 0,
    type: "Terrestrial"
  },
  {
    name: "Venus",
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    color: "#e8cda0",
    orbitRadius: 100,
    size: 8,
    description: "The hottest planet due to its thick atmosphere of CO₂. It rotates backwards compared to most planets.",
    moons: 0,
    type: "Terrestrial"
  },
  {
    name: "Earth",
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    color: "#4da6ff",
    orbitRadius: 140,
    size: 9,
    description: "Our home planet — the only known world with liquid water on its surface and life.",
    moons: 1,
    type: "Terrestrial"
  },
  {
    name: "Mars",
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    color: "#e07040",
    orbitRadius: 180,
    size: 7,
    description: "The Red Planet, named for its iron oxide surface. Home to the tallest volcano in the solar system — Olympus Mons.",
    moons: 2,
    type: "Terrestrial"
  },
  {
    name: "Jupiter",
    diameter: 142984,
    distanceFromSun: 778.6,
    orbitalPeriod: 4333,
    color: "#d4a574",
    orbitRadius: 240,
    size: 20,
    description: "The largest planet, a gas giant with a famous Great Red Spot — a storm larger than Earth.",
    moons: 95,
    type: "Gas Giant"
  },
  {
    name: "Saturn",
    diameter: 120536,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10759,
    color: "#f0d890",
    orbitRadius: 310,
    size: 17,
    description: "Famous for its stunning ring system made of ice and rock. It's the least dense planet — it could float on water!",
    moons: 146,
    type: "Gas Giant"
  },
  {
    name: "Uranus",
    diameter: 51118,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30687,
    color: "#7de8e8",
    orbitRadius: 370,
    size: 13,
    description: "An ice giant that rotates on its side. Its blue-green color comes from methane in its atmosphere.",
    moons: 28,
    type: "Ice Giant"
  },
  {
    name: "Neptune",
    diameter: 49528,
    distanceFromSun: 4495.1,
    orbitalPeriod: 60190,
    color: "#4466ff",
    orbitRadius: 420,
    size: 12,
    description: "The windiest planet with speeds up to 2,100 km/h. It's the farthest planet from the Sun.",
    moons: 16,
    type: "Ice Giant"
  }
];
