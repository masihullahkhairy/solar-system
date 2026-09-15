import { useRef, useEffect, useCallback } from "react";
import { planets, PlanetData } from "../data/planets";

interface SolarSystemCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
}

export default function SolarSystemCanvas({
  isPlaying,
  speed,
  selectedPlanet,
  onSelectPlanet,
}: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; opacity: number; twinkleSpeed: number }[]>([]);
  const scaleRef = useRef<number>(1);
  const logicalSizeRef = useRef<{ width: number; height: number }>({ width: 800, height: 600 });

  const generateStars = useCallback((width: number, height: number) => {
    const stars = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }
    starsRef.current = stars;
  }, []);

  const getScale = useCallback((width: number, height: number) => {
    const minDim = Math.min(width, height);
    return minDim / 900;
  }, []);

  const drawStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    if (starsRef.current.length === 0) {
      generateStars(width, height);
    }
    starsRef.current.forEach((star) => {
      const twinkle = Math.sin(time * star.twinkleSpeed * 60) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
      ctx.fill();
    });
  }, [generateStars]);

  const drawSun = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, time: number) => {
    const sunRadius = 28 * scale;

    // Pulsing outer corona
    const pulseSize = Math.sin(time * 2) * 5 * scale + 55 * scale;
    const coronaGradient = ctx.createRadialGradient(cx, cy, sunRadius * 0.5, cx, cy, pulseSize);
    coronaGradient.addColorStop(0, "rgba(255, 200, 50, 0.4)");
    coronaGradient.addColorStop(0.5, "rgba(255, 140, 20, 0.15)");
    coronaGradient.addColorStop(1, "rgba(255, 50, 0, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = coronaGradient;
    ctx.fill();

    // Sun glow
    const glowGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius * 1.8);
    glowGradient.addColorStop(0, "rgba(255, 220, 80, 0.9)");
    glowGradient.addColorStop(0.4, "rgba(255, 160, 20, 0.5)");
    glowGradient.addColorStop(0.7, "rgba(255, 100, 0, 0.2)");
    glowGradient.addColorStop(1, "rgba(255, 50, 0, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius * 1.8, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Sun body
    const sunGradient = ctx.createRadialGradient(cx - sunRadius * 0.2, cy - sunRadius * 0.2, 0, cx, cy, sunRadius);
    sunGradient.addColorStop(0, "#fff8e0");
    sunGradient.addColorStop(0.3, "#ffdd44");
    sunGradient.addColorStop(0.7, "#ffaa00");
    sunGradient.addColorStop(1, "#ff6600");
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();
  }, []);

  const drawOrbit = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, isSelected: boolean) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      if (isSelected) {
        ctx.strokeStyle = "rgba(100, 180, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    },
    []
  );

  const drawPlanet = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      planet: PlanetData,
      isSelected: boolean,
      scale: number
    ) => {
      const displaySize = planet.size * scale;

      // Planet glow when selected
      if (isSelected) {
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, displaySize + 15 * scale);
        glowGradient.addColorStop(0, `${planet.color}66`);
        glowGradient.addColorStop(0.5, `${planet.color}22`);
        glowGradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, displaySize + 15 * scale, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }

      // Subtle glow for all planets
      const subtleGlow = ctx.createRadialGradient(x, y, displaySize * 0.5, x, y, displaySize * 2);
      subtleGlow.addColorStop(0, `${planet.color}22`);
      subtleGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, displaySize * 2, 0, Math.PI * 2);
      ctx.fillStyle = subtleGlow;
      ctx.fill();

      // Planet body with gradient
      const planetGradient = ctx.createRadialGradient(
        x - displaySize * 0.3,
        y - displaySize * 0.3,
        0,
        x,
        y,
        displaySize
      );
      planetGradient.addColorStop(0, lightenColor(planet.color, 50));
      planetGradient.addColorStop(0.6, planet.color);
      planetGradient.addColorStop(1, darkenColor(planet.color, 50));
      ctx.beginPath();
      ctx.arc(x, y, displaySize, 0, Math.PI * 2);
      ctx.fillStyle = planetGradient;
      ctx.fill();

      // Saturn's rings
      if (planet.name === "Saturn") {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(x, y, displaySize * 2, displaySize * 0.5, 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(240, 216, 144, 0.5)";
        ctx.lineWidth = 3 * scale;
        ctx.stroke();
        // Inner ring
        ctx.beginPath();
        ctx.ellipse(x, y, displaySize * 1.6, displaySize * 0.4, 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(200, 180, 120, 0.3)";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.restore();
      }

      // Earth's moon hint
      if (planet.name === "Earth") {
        const moonAngle = timeRef.current * 3;
        const moonX = x + Math.cos(moonAngle) * displaySize * 2;
        const moonY = y + Math.sin(moonAngle) * displaySize * 2;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#cccccc";
        ctx.fill();
      }

      // Planet label
      ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.65)";
      ctx.font = `${isSelected ? "bold " : ""}${Math.max(10, 11 * scale)}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(planet.name, x, y + displaySize + 14 * scale);
    },
    []
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      // Background
      const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.7);
      bgGradient.addColorStop(0, "#0d0d2b");
      bgGradient.addColorStop(0.5, "#0a0a1a");
      bgGradient.addColorStop(1, "#050510");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      drawStars(ctx, width, height, time);

      const cx = width / 2;
      const cy = height / 2;
      const scale = scaleRef.current;

      // Draw orbits
      planets.forEach((planet) => {
        drawOrbit(ctx, cx, cy, planet.orbitRadius * scale, selectedPlanet?.name === planet.name);
      });

      // Draw Sun
      drawSun(ctx, cx, cy, scale, time);

      // Draw planets
      planets.forEach((planet) => {
        const angularSpeed = (2 * Math.PI) / (planet.orbitalPeriod * 0.5);
        const angle = time * angularSpeed;
        const x = cx + Math.cos(angle) * planet.orbitRadius * scale;
        const y = cy + Math.sin(angle) * planet.orbitRadius * scale;

        drawPlanet(ctx, x, y, planet, selectedPlanet?.name === planet.name, scale);
      });
    },
    [drawStars, drawSun, drawOrbit, drawPlanet, selectedPlanet]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isPlaying) {
      timeRef.current += 0.016 * speed;
    }

    const { width, height } = logicalSizeRef.current;
    draw(ctx, width, height, timeRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [isPlaying, speed, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
        logicalSizeRef.current = { width, height };
        scaleRef.current = getScale(width, height);
        generateStars(width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, generateStars, getScale]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const scale = scaleRef.current;

    let clickedPlanet: PlanetData | null = null;

    // Check planets in reverse order so outer planets are checked first (they're drawn on top)
    for (let i = planets.length - 1; i >= 0; i--) {
      const planet = planets[i];
      const angularSpeed = (2 * Math.PI) / (planet.orbitalPeriod * 0.5);
      const angle = timeRef.current * angularSpeed;
      const px = cx + Math.cos(angle) * planet.orbitRadius * scale;
      const py = cy + Math.sin(angle) * planet.orbitRadius * scale;

      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      const hitRadius = Math.max(planet.size * scale + 8, 15);
      if (dist < hitRadius) {
        clickedPlanet = planet;
        break;
      }
    }

    onSelectPlanet(clickedPlanet);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full h-full cursor-pointer"
      style={{ display: "block" }}
    />
  );
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}
