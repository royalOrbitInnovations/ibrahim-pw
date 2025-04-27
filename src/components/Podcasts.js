"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { podcasts } from "@/data/podcasts";
import ScrollingText from "./ScrollingText";

// --- define your custom drag cursor variants ---
const cursorVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: ({ x, y }) => ({
    opacity: 1,
    scale: 1,
    x: x - 10,
    y: y - 10,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  }),
};

export default function PodcastCarousel() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(outerRef, { once: true, margin: "-50px" });

  const [dragWidth, setDragWidth] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // start entrance animation
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // calculate drag constraints
  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return;
    setDragWidth(trackRef.current.scrollWidth - outerRef.current.offsetWidth);
  }, [podcasts]);

  return (
    <>
      <ScrollingText text="podcasts" baseVelocity={200} size={3} />
      <div className="px-[15rem]">
        <div
          ref={outerRef}
          className="relative overflow-x-hidden pt-[5rem]"
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
        >
          {/* custom drag cursor */}
          <motion.div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center w-30 h-30 text-[5rem] rounded-full bg-white text-black -translate-x-1/2 -translate-y-1/2"
            variants={cursorVariants}
            animate={showCursor ? "visible" : "hidden"}
            custom={cursor}
          >
            {"<>"}
          </motion.div>

          {/* draggable track */}
          <motion.ul
            ref={trackRef}
            className="flex select-none gap-[4rem] pl-4 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            whileTap={{ scale: 0.93 }}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            {podcasts.map((podcast, idx) => (
              <li key={idx} className="relative">
                <motion.div
                  className="w-[50rem] h-[50rem] overflow-hidden rounded-2xl border-2 bg-gray-900 shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* image */}
                  <div className="relative h-[30rem] w-[50rem]">
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      className="object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>

                  {/* text */}
                  <div className="mt-[2rem] flex flex-col gap-2 px-[2rem] py-[2rem] text-white">
                    <h3 className="line-clamp-1 text-[2.5rem] font-bold">
                      {podcast.title}
                    </h3>
                    <p className="line-clamp-4 text-[1.5rem] leading-relaxed opacity-80">
                      {podcast.description}
                    </p>
                    {/* Listen Now overlay */}
                    {hoveredIndex === idx && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={podcast.url}
                          target="_blank"
                          className="px-6 py-3 bg-teal-600 text-white text-[1.5rem] rounded-full hover:bg-teal-500"
                        >
                          Listen Now
                        </Link>
                      </motion.div>
                    )}

                    {/* placeholder for spacing at bottom */}
                    <div className="pt-4" />
                  </div>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </>
  );
}
