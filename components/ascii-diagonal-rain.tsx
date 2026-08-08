"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Exact port of Griffin's homepage "AsciiPattern": a layered sine-noise terrain
// field where each cell's noise value picks a glyph + color, with contour lines
// emphasised. Config and constants taken verbatim from the live site.

const CONFIG = {
  cellWidth: 12,
  cellHeight: 14,
  fontSize: 12,
  fontWeight: 400,
  terrainScale: 0.13,
  contourSpacing: 0.08,
  opacity: 1,
  speed: 0.9,
  frameSkip: 2,
};

const LEVELS = [
  { min: 15, char: "·", color: "#1A1918" },
  { min: 50, char: "/", color: "#2C2A28" },
  { min: 100, char: "$", color: "#524E4A" },
  { min: 160, char: "£", color: "#959089" },
];

// Base multi-octave sine noise. e,t are terrain coords, n is time.
function noise(e: number, t: number, n: number): number {
  let a = 0;
  a += Math.sin(0.8 * e + 0.3 * n) * Math.cos(0.6 * t + 0.2 * n) * 0.5;
  a += 0.25 * Math.sin(1.6 * e + 1.2 * t + 0.15 * n);
  a += Math.sin(0.3 * e - 0.4 * n) * Math.cos(0.4 * t + 0.25 * n) * 0.6;
  a += 0.3 * Math.sin(0.5 * (e + t) + 0.35 * n);
  a += Math.sin(2.5 * e + 0.1 * n) * Math.cos(2.8 * t - 0.12 * n) * 0.15;
  return a;
}

// Combined terrain height in [0,1].
function terrain(e: number, t: number, n: number): number {
  let a = noise(e, t, n);
  a += 0.4 * noise(2.2 * e, 2.2 * t, 0.7 * n);
  a += 0.15 * noise(4.5 * e, 4.5 * t, 0.4 * n);
  const r = (a + 1.8) / 3.6;
  return Math.max(0, Math.min(1, r));
}

// Per-cell brightness value 0..255, with contour-line emphasis.
function cellValue(e: number, t: number, n: number, spacing: number): number {
  const r = terrain(e, t, n);
  const s = (r % spacing) / spacing;
  const onContour = s < 0.12 || s > 0.88;
  let c = onContour ? Math.round(200 * r + 55) : Math.round(140 * r);
  if (onContour) {
    const gx = noise(e + 0.01, t, n) - noise(e - 0.01, t, n);
    const gy = noise(e, t + 0.01, n) - noise(e, t - 0.01, n);
    const d = 12 * Math.sqrt(gx * gx + gy * gy);
    if (d > 0.5) c = Math.min(255, c + Math.round(40 * d));
  }
  return c;
}

function levelForValue(v: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (v >= LEVELS[i].min) return i;
  }
  return -1;
}

export function AsciiDiagonalRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let frame = 0;
    let dirty = true;
    const start = performance.now();

    const reduce = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    let reduced = !!reduce && reduce.matches;

    function setSize(w: number, h: number) {
      width = w;
      height = h;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
    }

    function render(time: number) {
      const { cellWidth, cellHeight, terrainScale, contourSpacing } = CONFIG;
      const cols = Math.ceil(width / cellWidth) + 1;
      const rows = Math.ceil(height / cellHeight) + 1;

      ctx!.clearRect(0, 0, width, height);
      ctx!.font = `${CONFIG.fontWeight} ${CONFIG.fontSize}px "Sohne Mono", ui-monospace, monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.globalAlpha = CONFIG.opacity;

      const buckets: number[][] = LEVELS.map(() => []);
      for (let row = 0; row < rows; row++) {
        const ty = (row + 0.5) * terrainScale;
        for (let col = 0; col < cols; col++) {
          const value = cellValue((col + 0.5) * terrainScale, ty, time, contourSpacing);
          const level = levelForValue(value);
          if (level < 0) continue;
          buckets[level].push(col * cellWidth + cellWidth / 2, row * cellHeight + cellHeight / 2);
        }
      }

      for (let i = 0; i < LEVELS.length; i++) {
        const pts = buckets[i];
        if (pts.length === 0) continue;
        ctx!.fillStyle = LEVELS[i].color;
        for (let j = 0; j < pts.length; j += 2) {
          ctx!.fillText(LEVELS[i].char, pts[j], pts[j + 1]);
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      frame++;
      if (!reduced) {
        if (frame % CONFIG.frameSkip === 0) {
          render(((now - start) / 1000) * CONFIG.speed);
        }
        raf = requestAnimationFrame(loop);
        return;
      }
      if (dirty) {
        render(0);
        dirty = false;
      }
      raf = requestAnimationFrame(loop);
    }

    setSize(wrapper.clientWidth, wrapper.clientHeight);
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize(rect.width, rect.height);
    });
    ro.observe(wrapper);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduced = e.matches;
      dirty = true;
    };
    reduce?.addEventListener?.("change", onMotionChange);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      reduce?.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
