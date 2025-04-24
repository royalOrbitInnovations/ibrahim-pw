"use client";
import { useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";

export default function BgLines() {
  // track viewport size so transforms don't break SSR
  const [size, setSize] = useState({ width: 0, height: 0 });

  // motion values for the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // map mouse position into ±30px offsets
  const offsetX = useTransform(mouseX, [0, size.width], [-30, 30]);
  const offsetY = useTransform(mouseY, [0, size.height], [-30, 30]);

  useEffect(() => {
    // only runs in the browser
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      // start centered
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    function handleMouse(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mouseX, mouseY]);

  const rows = 20;
  const cols = 20;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Horizontal lines */}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute left-0 right-0 h-px bg-white opacity-10"
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
          className="absolute top-0 bottom-0 w-px bg-white opacity-10"
          style={{
            left: `${(j / (cols - 1)) * 100}%`,
            y: offsetY,
          }}
        />
      ))}
    </div>
  );
}
