// components/Banner.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import BgLines from "./BgLines";

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: { scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const listItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.1, color: "#FFD700" },
  };

  return (
    <div className="relative bg-teal h-screen overflow-hidden">
      <BgLines />

      <motion.div
        className="relative grid grid-cols-3 place-items-center text-white px-40 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Intro Section */}
        <motion.div
          variants={itemVariants}
          className="text-left self-start pt-[10rem] z-10"
        >
          <motion.h1
            variants={itemVariants}
            whileHover="hover"
            className="text-2xl font-bold text-darker"
          >
            Hello, I&apos;m
            <br />
            <span className="text-[5rem] text-lighter">
              Ibrahim Khalil Janneh
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[2rem] mt-4 max-w-[90%]"
          >
            Nostrud reprehenderit ullamco labore magna aute do consectetur sit.
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={itemVariants}
          className="relative w-full h-[70vh] self-end z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/banner-nbg.png"
            alt="Personal Image"
            className="object-cover object-top rounded-2xl"
            fill
          />
        </motion.div>

        {/* Links & Quote Section */}
        <motion.div
          className="text-right w-[90%] relative self-end pb-[10rem] z-10 flex flex-col justify-between h-full py-[10rem]"
          variants={itemVariants}
          whileInView={{ x: [100, 0], opacity: [0, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 text-[2rem] font-semibold text-darker mb-4"
          >
            {[
              "Courses",
              "Workshops",
              "Books",
              "Media",
              "Partner with me",
              "Blogs",
            ].map((link) => (
              <motion.li
                key={link}
                variants={listItemVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                {link}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} className="relative">
            <h2 className="text-[2.5rem] font-bold text-darker relative">
              <span className="text-[20rem] absolute -top-12 -left-8 text-dark opacity-50">
                ❝
              </span>
              <motion.span
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative"
              >
                Nisi commodo occaecat velit exercitation incididunt ad ipsum
                quis aliqua sunt minim.
              </motion.span>
            </h2>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
