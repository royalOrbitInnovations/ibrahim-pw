"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- define your cursor variants up here ---
const cursorVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: ({ x, y }) => ({
    opacity: 1,
    scale: 1,
    x: x - 10, // half of your 40px width
    y: y - 10, // half of your 40px height
    transition: { type: "spring", stiffness: 200, damping: 20 },
  }),
};

export default function Carousel({ data = [], linkText }) {
  /* ---------- refs ---------------------------------------------------- */
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const controls = useAnimation();

  /* ---------- fade/slide-in on scroll --------------------------------- */
  const isInView = useInView(outerRef, { once: true, margin: "-50px" });
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  /* ---------- drag constraints --------------------------------------- */
  const [dragWidth, setDragWidth] = useState(0);
  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return;
    setDragWidth(trackRef.current.scrollWidth - outerRef.current.offsetWidth);
  }, [data]);

  /* ---------- custom cursor state ------------------------------------ */
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  /* ---------- render -------------------------------------------------- */
  return (
    <div
      ref={outerRef}
      className="relative overflow-hidden py-[5rem]"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
    >
      {/* custom “<>” cursor */}
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
        {data.map((item) => (
          <li key={item.id}>
            <motion.div className="w-[50rem] overflow-hidden rounded-2xl border-2 bg-gray-900 shadow-lg transition-all duration-300 hover:scale-[1.02]">
              {/* image */}
              <div className="relative h-[30rem] w-[50rem]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </div>

              {/* text */}
              <div className="mt-[2rem] flex flex-col gap-2 px-[2rem] py-[2rem] text-white">
                <h3 className="line-clamp-1 text-[2.5rem] font-bold">
                  {item.name}
                </h3>
                <p className="line-clamp-4 text-[1.5rem] leading-relaxed opacity-80">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-2 text-[2rem] opacity-90">
                  <span>{item.duration}</span>
                  <span className="font-semibold">${item.price}</span>
                </div>
                <Link
                  href={item.link || "#"}
                  target="_blank"
                  className="mt-3 self-start text-[1.5rem] text-teal-300 hover:underline"
                >
                  {linkText}
                </Link>
              </div>
            </motion.div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
