"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import ScrollingText from "./ScrollingText";

const images = ["/contact.jpg", "/contact.jpg", "/contact.jpg"];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");
  const [currentIdx, setCurrentIdx] = useState(0);

  // cycle slides every 3s
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  // EmailJS credentials
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    error: { x: [-3, 3, -3, 3, 0], transition: { duration: 0.4 } },
  };

  return (
    <>
      <ScrollingText text="Let’s Connect" baseVelocity={200} />
      <section className="flex flex-col md:flex-row items-center justify-center gap-16 bg-transparent px-[15rem] py-24">
        {/* Text + carousel */}
        <motion.div
          className="md:w-1/2 text-left flex flex-col justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.8 }}
        >
          <div className="relative h-[37rem] w-full md:w-[60%] mb-8 overflow-hidden mx-auto">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIdx}
                className="absolute inset-0"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={images[currentIdx]}
                  alt={`Slide ${currentIdx}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="w-full md:w-[35%]"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.8 }}
        >
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-slate-50/90 rounded-2xl shadow-xl p-10 grid gap-6 backdrop-blur-sm"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
            {[
              ["Name", "text", "user_name"],
              ["Email", "email", "user_email"],
              ["Phone", "tel", "user_phone"],
              ["Message", "textarea", "message"],
            ].map(([label, type, name], i) => (
              <motion.div
                key={name}
                custom={i}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="block text-sm font-medium text-darker mb-1">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:border-teal-600 focus:ring-0 bg-transparent text-darker placeholder:text-slate-400"
                    placeholder={`Your ${label}`}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    required
                    className="w-full px-4 py-3 rounded-md border border-slate-300 focus:border-teal-600 focus:ring-0 bg-transparent text-darker placeholder:text-slate-400"
                    placeholder={`Your ${label}`}
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              animate={status === "error" ? "error" : "idle"}
              type="submit"
              disabled={status === "sending"}
              className="mx-auto mt-4 px-8 py-3 border-2 border-teal-700 text-teal-700 font-semibold rounded-md hover:bg-teal-700 hover:text-white transition"
            >
              {status === "sending"
                ? "Sending…"
                : status === "success"
                ? "Sent"
                : status === "error"
                ? "Try Again"
                : "Send Message"}
            </motion.button>

            {status === "success" && (
              <motion.p
                className="mt-4 text-center text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Your message has been sent. I’ll be in touch soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                className="mt-4 text-center text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>
    </>
  );
}
