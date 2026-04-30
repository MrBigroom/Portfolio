"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference"
    >
      <a href="#" className="mono text-xs tracking-widest uppercase text-bone-50">
        Chan Yu Xuan / BIT '26
      </a>
      <div className="hidden md:flex items-center gap-8 mono text-xs tracking-widest uppercase">
        <a href="#work" className="magnetic">Work</a>
        <a href="#about" className="magnetic">About</a>
        <a href="#contact" className="magnetic">Contact</a>
      </div>
      <a
        href="#contact"
        className="md:hidden mono text-xs tracking-widest uppercase magnetic"
      >
        Hire →
      </a>
    </motion.nav>
  );
}
