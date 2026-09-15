# 🪐 Solar System Explorer

An interactive, animated visualization of our Solar System built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Explore all eight planets, learn fascinating facts, and watch them orbit the Sun in real time.

![Solar System Explorer](https://img.shields.io/badge/React-18-61dafb?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square)

---

## ✨ Features

- **Animated Orbits** — All eight planets orbit the Sun with scientifically proportional orbital periods
- **Interactive Planets** — Click any planet (on canvas or sidebar) to reveal a detailed info card
- **Planet Info Cards** — View diameter, distance from the Sun, orbital period, moon count, and a fun description
- **Playback Controls** — Play / Pause the animation and adjust speed from 0.1× to 10×
- **Speed Presets** — Quick-select buttons for 0.5×, 1×, 2×, and 5× speed
- **Responsive Canvas** — Automatically scales to any screen size with HiDPI / Retina support
- **Twinkling Stars** — 400 procedurally generated stars with subtle twinkling animation
- **Planet Details** — Saturn's rings, Earth's orbiting moon, and gradient-shaded planet surfaces
- **Sidebar Selector** — Left-side planet quick-select for easy navigation

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/solar-system-explorer.git
cd solar-system-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` directory.

---

## 📁 Project Structure

```
solar-system-explorer/
├── index.html                        # Entry HTML with dark theme base styles
├── package.json                      # Dependencies and scripts
├── vite.config.js                    # Vite bundler configuration
├── tsconfig.json                     # TypeScript configuration
├── src/
│   ├── main.tsx                      # React app entry point
│   ├── App.tsx                       # Root component — layout & state
│   ├── index.css                     # Global styles, animations, range slider
│   ├── data/
│   │   └── planets.ts               # Planet data (name, size, orbit, facts)
│   └── components/
│       ├── SolarSystemCanvas.tsx      # HTML5 Canvas renderer (orbits, planets, stars)
│       ├── PlanetInfoPanel.tsx        # Slide-in info card for selected planet
│       ├── PlanetSelector.tsx         # Left sidebar planet quick-select buttons
│       └── Controls.tsx               # Play/Pause, speed slider, speed presets
```

---

## 🎮 How to Use

| Action | Description |
|--------|-------------|
| **Click a planet** on the canvas | Opens the info panel with facts about that planet |
| **Click a planet** in the left sidebar | Same as above — selects and highlights the planet |
| **▶ / ⏸ button** | Toggles the orbital animation on and off |
| **Speed slider** | Smoothly adjusts animation speed from 0.1× to 10× |
| **Speed preset buttons** | Quickly jump to 0.5×, 1×, 2×, or 5× speed |
| **✕ button** on info panel | Closes the planet info card |

---

## 🌍 Planet Data

| Planet | Diameter (km) | Distance from Sun (M km) | Orbital Period | Moons |
|--------|--------------|--------------------------|----------------|-------|
| Mercury | 4,879 | 57.9 | 88 days | 0 |
| Venus | 12,104 | 108.2 | 225 days | 0 |
| Earth | 12,756 | 149.6 | 365 days | 1 |
| Mars | 6,792 | 227.9 | 687 days | 2 |
| Jupiter | 142,984 | 778.6 | 11.9 years | 95 |
| Saturn | 120,536 | 1,433.5 | 29.5 years | 146 |
| Uranus | 51,118 | 2,872.5 | 84 years | 28 |
| Neptune | 49,528 | 4,495.1 | 164.8 years | 16 |

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks for state management |
| **TypeScript** | Type-safe component props and data structures |
| **Vite** | Lightning-fast dev server and production bundler |
| **Tailwind CSS 4** | Utility-first styling with dark theme |
| **HTML5 Canvas** | High-performance 2D rendering of the solar system |

---

## 🎨 Design Highlights

- **Dark space theme** with radial gradient background
- **Glassmorphism UI** — frosted glass panels with backdrop blur
- **Smooth animations** — slide-in info cards, hover effects, scale transitions
- **Custom range slider** styled to match the cosmic theme
- **HiDPI / Retina support** — crisp rendering on high-density displays
- **Responsive layout** — scales gracefully from mobile to ultrawide monitors

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and a lot of <code>Math.cos()</code>
</p>
