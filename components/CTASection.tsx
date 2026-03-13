"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#080c08] overflow-hidden">
      {/* Bakgrunns-glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-green-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-widest text-green-400 mb-8"
        >
          Regnskogfondet
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light leading-tight max-w-3xl text-white mb-16"
        >
          Bli med og redd regnskogen —{" "}
          <span className="text-green-400">for vår felles framtid.</span>
        </motion.h2>

        {/* Animert knapp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative flex items-center justify-center"
        >
          {/* Pulserende ringer */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border border-green-400/30"
              animate={{
                scale: [1, 2.2],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          ))}

          {/* Roterende stiplet ring */}
          <motion.span
            className="absolute rounded-full"
            style={{
              width: "calc(100% + 28px)",
              height: "calc(100% + 28px)",
              border: "1.5px dashed rgba(74,222,128,0.4)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          <a
            href="https://www.regnskog.no/no/stott-oss"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(74,222,128,0.15)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative px-12 py-5 rounded-full border border-green-400 text-green-400 text-lg tracking-wide bg-transparent cursor-pointer"
            >
              Støtt oss
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
