"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic"; // ← load on the client only
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import animationData from "@/contact.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'

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
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  /* ---------------- framer-motion variants ---------------- */
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    error: { x: [-3, 3, -3, 3, 0], transition: { duration: 0.4 } },
  };

  /* ---------------------------- UI ------------------------ */
  return (
    <section className="flex flex-col md:flex-row items-start md:items-center bg-transparent px-8 md:px-24 py-24">
      {/* Animation + headline */}
      <motion.div
        className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
      >
        <div className="mb-8">
          <Lottie
            animationData={animationData}
            loop
            className="w-64 h-64 mx-auto md:mx-0"
          />
        </div>

        <h2 className="text-5xl font-bold text-darker mb-4">
          Ready&nbsp;to&nbsp;Collaborate?
        </h2>
        <p className="text-lg text-lighter mb-6">
          Drop your details below and let’s start building something exceptional
          together.
        </p>
      </motion.div>

      {/* Contact form */}
      <motion.div
        className="md:w-1/2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
      >
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white/70 rounded-2xl shadow-lg p-10 grid gap-6 backdrop-blur-sm"
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
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-md border border-white focus:border-dark focus:ring-0 text-darker placeholder:text-lighter bg-transparent"
                  placeholder={`Your ${label}`}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  required
                  className="w-full px-4 py-3 rounded-md border border-white focus:border-dark focus:ring-0 text-darker placeholder:text-lighter bg-transparent"
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
            className="mt-4 py-3 w-full border-2 border-dark text-dark font-semibold rounded-md hover:bg-dark hover:text-light transition"
          >
            {status === "sending"
              ? "Sending..."
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
  );
}
