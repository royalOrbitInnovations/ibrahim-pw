"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollingText from "./ScrollingText";
import emailjs from "@emailjs/browser";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaBehance,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yourprofile",
    icon: <FaLinkedin size={32} aria-label="LinkedIn" />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/yourprofile",
    icon: <FaInstagram size={32} aria-label="Instagram" />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/yourprofile",
    icon: <FaFacebook size={32} aria-label="Facebook" />,
  },
  {
    name: "Behance",
    url: "https://www.behance.net/yourprofile",
    icon: <FaBehance size={32} aria-label="Behance" />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourprofile",
    icon: <FaTwitter size={32} aria-label="Twitter" />,
  },
  {
    name: "Email",
    url: "mailto:example@gmail.com",
    icon: <FaEnvelope size={32} aria-label="Email" />,
  },
];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  // reset on success
  useEffect(() => {
    if (status === "success" && formRef.current) formRef.current.reset();
  }, [status]);

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
    } catch (err) {
      console.error(err);
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
      <ScrollingText text="Let’s Connect" baseVelocity={200} size={3} />
      <section className="flex flex-col md:flex-row items-start justify-center gap-16 bg-transparent px-16 py-24">
        {/* Socials Section */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start justify-center space-y-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut", duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-darker pb-[2rem]">Socials</h2>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-darker hover:text-teal-600"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                {link.icon}
                <span className=" pl-[1rem] text-base font-medium">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="w-full md:w-[35%] flex flex-col items-start"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeOut", duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-darker mb-4">Say Hello</h3>
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-slate-50\/90 rounded-2xl shadow-xl p-10 grid gap-6 w-full backdrop-blur-sm"
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
