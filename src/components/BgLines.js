// components/BgLines.jsx
"use client";
import { useRef, useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";

export default function BgLines() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Map mouse position to a small offset range
  const offsetX = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const offsetY = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouse);
    return () => container.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const rows = 20;
  const cols = 20;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
    >
      {/* Horizontal lines */}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute left-0 right-0 h-px bg-dark opacity-10"
          style={{
            top: `${(i / (rows - 1)) * 100}%`,
            x: offsetX,
          }}
        />
      ))}

      {/* Vertical lines */}
      {Array.from({ length: cols }).map((_, j) => (
        <motion.div
          key={`v${j}`}
          className="absolute top-0 bottom-0 w-px bg-dark opacity-10"
          style={{
            left: `${(j / (cols - 1)) * 100}%`,
            y: offsetY,
          }}
        />
      ))}
    </div>
  );
}
