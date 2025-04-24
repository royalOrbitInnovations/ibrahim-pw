// components/ScrollingText.jsx
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { ScrollbarContext } from "./ScrollbarProvider";

export default function ScrollingText({ text, baseVelocity = 50, size = 8 }) {
  const scrollY = useMotionValue(0);
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-10, 0, 10]
  );

  const x = useMotionValue(0);
  const directionFactor = useRef(1);
  const containerRef = useRef(null);
  const [blockWidth, setBlockWidth] = useState(0);

  // 4) grab the scrollbar instance out of context
  const scrollbar = useContext(ScrollbarContext);

  // 5) only subscribe once scrollbar is ready
  useEffect(() => {
    if (!scrollbar) return;

    const onScroll = () => {
      scrollY.set(scrollbar.offset.y);
    };
    scrollbar.addListener(onScroll);
    return () => scrollbar.removeListener(onScroll);
  }, [scrollbar, scrollY]);

  // 6) track scroll direction
  useEffect(() => {
    const unsubscribe = smoothVelocity.onChange((v) => {
      if (v > 0.1) directionFactor.current = 1;
      else if (v < -0.1) directionFactor.current = -1;
    });
    return unsubscribe;
  }, [smoothVelocity]);

  // 7) measure width of one block of text
  useEffect(() => {
    if (!containerRef.current) return;
    setBlockWidth(containerRef.current.getBoundingClientRect().width);
  }, [text]);

  // 8) loop animation, factoring in scroll velocity
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    moveBy += directionFactor.current * moveBy * factor;

    const next = x.get() + moveBy;
    if (blockWidth) {
      if (next > 0) x.set(-blockWidth);
      else if (next < -blockWidth) x.set(0);
      else x.set(next);
    }
  });

  const repeats = blockWidth
    ? Math.ceil((window.innerWidth + blockWidth) / blockWidth)
    : 1;

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        ref={containerRef}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          x,
          fontSize: `${size}vw`,
          fontWeight: "bold",
        }}
      >
        {Array.from({ length: repeats }).map((_, i) => (
          <span key={i} style={{ marginRight: "2rem" }}>
            {text.toUpperCase()}.
          </span>
        ))}
      </motion.div>
    </div>
  );
}
