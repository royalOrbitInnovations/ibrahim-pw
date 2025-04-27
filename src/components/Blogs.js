"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import ScrollingText from "./ScrollingText";

// --- custom drag cursor variants ---
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

export default function BlogCarousel() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(outerRef, { once: true, margin: "-50px" });

  const [dragWidth, setDragWidth] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // entrance animation
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // calculate drag constraints
  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return;
    setDragWidth(trackRef.current.scrollWidth - outerRef.current.offsetWidth);
  }, [blogs]);

  return (
    <div className="pt-[5rem]">
      <ScrollingText text="blogs" baseVelocity={150} size={3} />
      <div className="px-[15rem] ">
        <div
          ref={outerRef}
          className="relative overflow-x-hidden pt-[5rem] pb-[2rem]"
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY - 100 })}
          onMouseEnter={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
        >
          {/* drag cursor */}
          <motion.div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center w-30 h-30 text-[5rem] rounded-full bg-white text-black -translate-x-[15rem]  -translate-y-[30rem]"
            variants={cursorVariants}
            animate={showCursor ? "visible" : "hidden"}
            custom={cursor}
          >
            {"<>"}
          </motion.div>

          {/* draggable list */}
          <motion.ul
            ref={trackRef}
            className="flex select-none gap-[3rem] pl-4 cursor-grab active:cursor-grabbing"
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
            {blogs.map((blog, idx) => (
              <li key={blog.id} className="relative">
                <motion.div
                  className="w-[40rem] overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-[1.02]"
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* image */}
                  <div className="relative h-[25rem] w-[40rem]">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>

                  {/* content */}
                  <div className="mt-[2rem] flex flex-col gap-2 px-[2rem] py-[2rem] text-black">
                    <h3 className="line-clamp-1 text-[2.2rem] font-bold">
                      {blog.title}
                    </h3>
                    <p className="line-clamp-3 text-[1.4rem] leading-relaxed opacity-80">
                      {blog.shortDescription}
                    </p>

                    {/* Read More overlay */}
                    {hoveredIndex === idx && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={blog.link}
                          target="_blank"
                          className="px-6 py-3 bg-teal-600 text-white text-[1.3rem] rounded-full hover:bg-teal-500"
                        >
                          Read More
                        </Link>
                      </motion.div>
                    )}

                    {/* spacer */}
                    <div className="pt-4" />
                  </div>
                </motion.div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
