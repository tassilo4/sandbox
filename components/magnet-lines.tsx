"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A grid of lines that rotate to face the cursor, creating a magnetic field
 * effect, vendored from componentry.dev/docs/components/magnet-lines.
 */
export interface MagnetLinesProps {
  /** Number of rows in the grid (default: 9) */
  rows?: number;
  /** Number of columns in the grid (default: 9) */
  columns?: number;
  /** Size of the square container, as a CSS length (default: "80vmin") */
  containerSize?: string;
  /** Color of the lines (default: "#efefef") */
  lineColor?: string;
  /** Width (thickness) of each line, as a CSS length (default: "1vmin") */
  lineWidth?: string;
  /** Height (length) of each line, as a CSS length (default: "6vmin") */
  lineHeight?: string;
  /** Base rotation angle for the lines, in degrees (default: 0) */
  baseAngle?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = 0,
  className,
  style,
}: MagnetLinesProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className={cn("relative grid place-items-center", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans.map((i) => (
        <Line
          key={i}
          containerRef={containerRef}
          lineColor={lineColor}
          lineWidth={lineWidth}
          lineHeight={lineHeight}
          baseAngle={baseAngle}
        />
      ))}
    </div>
  );
}

function Line({
  containerRef,
  lineColor,
  lineWidth,
  lineHeight,
  baseAngle,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  lineColor: string;
  lineWidth: string;
  lineHeight: string;
  baseAngle: number;
}) {
  const lineRef = React.useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = React.useState(baseAngle);

  React.useEffect(() => {
    const updateRotation = (e: MouseEvent) => {
      if (!lineRef.current || !containerRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const angle = (Math.atan2(distanceY, distanceX) * 180) / Math.PI;
      setRotate(angle + baseAngle);
    };

    window.addEventListener("mousemove", updateRotation);
    return () => window.removeEventListener("mousemove", updateRotation);
  }, [baseAngle, containerRef]);

  return (
    <motion.div
      ref={lineRef}
      animate={{ rotate }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      style={{
        width: lineWidth,
        height: lineHeight,
        backgroundColor: lineColor,
      }}
    />
  );
}
