/* src/components/Books.jsx */
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import ScrollingText from "./ScrollingText";
import { books } from "@/data/books";

/* ---- break-point helpers ----------------------------------------- */
const ROW_SIZES = { base: 2, sm: 3, md: 4, lg: 5 };
function useRowSize() {
  if (typeof window === "undefined") return ROW_SIZES.base;
  if (window.matchMedia("(min-width:1024px)").matches) return ROW_SIZES.lg;
  if (window.matchMedia("(min-width:768px)").matches) return ROW_SIZES.md;
  if (window.matchMedia("(min-width:640px)").matches) return ROW_SIZES.sm;
  return ROW_SIZES.base;
}

export default function Books() {
  const rowSize = useRowSize();

  /* ---------- paging state --------------------------------------- */
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(books.length / rowSize);
  const pagedBooks = useMemo(
    () => books.slice(page * rowSize, page * rowSize + rowSize),
    [page, rowSize]
  );

  const next = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };
  const prev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };

  /* ---------- slide variants ------------------------------------- */
  const pageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.5 },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { type: "tween", ease: "easeIn", duration: 0.5 },
    }),
  };

  return (
    <section className="flex flex-col items-center gap-12 pt-24">
      <ScrollingText text="Books" baseVelocity={100} size={3} />

      {/* ---------- slider viewport -------------------------------- */}
      <div className="relative w-full px-6 max-w-[80vw] overflow-hidden">
        {/* Give the wrapper a fixed height so absolute items don’t collapse */}
        <div className="h-[45rem]">
          {" "}
          {/* 450px image + gap ≈ 32rem */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.ul
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              /* 👇 make both lists overlap */
              className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10"
            >
              {pagedBooks.map((book) => (
                <li
                  key={book.id}
                  className="relative group cursor-pointer select-none"
                >
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={300}
                    height={450}
                    priority={page === 0}
                    className="w-full h-full rounded-2xl shadow-xl"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <h3 className="text-white text-[3rem] font-semibold px-4 text-center">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="mt-1 text-[2rem] text-gray-300">
                        {book.author}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* ---------- nav bar ---------------------------------------- */}
      <div className="flex items-center gap-8">
        <button
          onClick={prev}
          disabled={page === 0}
          className="text-xl font-bold px-4 py-2 rounded-full border border-white/40 hover:bg-white/10 transition disabled:opacity-30"
        >
          &#8249; Prev
        </button>

        <span className="text-sm tracking-wide text-gray-300">
          {page + 1} / {totalPages}
        </span>

        <button
          onClick={next}
          disabled={page === totalPages - 1}
          className="text-xl font-bold px-4 py-2 rounded-full border border-white/40 hover:bg-white/10 transition disabled:opacity-30"
        >
          Next &#8250;
        </button>
      </div>
    </section>
  );
}
