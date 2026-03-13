"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => setProgress(video.currentTime / video.duration || 0);
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleStart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    setStarted(true);
  };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, scale }}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Gradient bunn */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10 pointer-events-none" />

      {/* Layout */}
      <div className="relative z-20 h-full flex flex-col xl:flex-row items-center justify-center xl:justify-between"
        style={{ padding: "clamp(2rem, 5vw, 4rem)" }}
      >
        {/* Tekst — venstre på desktop, bunn på mobil */}
        <motion.div
          className="w-full xl:w-2/5 flex flex-col justify-end xl:justify-center order-2 xl:order-1 pb-10 xl:pb-0"
          style={{ paddingBottom: undefined }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm uppercase tracking-widest text-green-400 mb-4"
          >
            Regnskogfondet
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            className="font-light leading-tight"
          >
            Verden trenger
            <br />
            <span className="text-green-400">regnskogen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 text-lg text-white/60"
          >
            Scroll for å lære mer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="w-px h-12 bg-white/30 overflow-hidden relative">
              <motion.div
                className="w-full bg-green-400"
                animate={{ height: ["0%", "100%", "0%"], y: ["-100%", "0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: 0 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Video — høyre på desktop, topp på mobil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full xl:w-[52%] order-1 xl:order-2 mb-8 xl:mb-0 xl:-translate-x-6"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setIsSeeking(false); }}
        >
          <div className="relative aspect-video rounded-xl xl:rounded-2xl overflow-hidden shadow-2xl">
            {/* Klikk for lyd — sentrert på videoen */}
            <AnimatePresence>
              {!started && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={handleStart}
                  className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        className="absolute w-20 h-20 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute w-20 h-20 rounded-full border border-white/20"
                        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                      />
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" stroke="none"/>
                          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                        </svg>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm tracking-widest uppercase">Klikk for lyd</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="/video/REGNSKOGFONDET_SKISSE_web.mp4"
            />

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-end"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 px-5 pb-4 flex flex-col gap-3">
                    <div
                      className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer group"
                      onClick={seek}
                      onMouseDown={() => setIsSeeking(true)}
                      onMouseUp={() => setIsSeeking(false)}
                      onMouseMove={(e) => { if (isSeeking) seek(e); }}
                    >
                      <div
                        className="h-full bg-green-400 rounded-full relative"
                        style={{ width: `${progress * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors backdrop-blur-sm"
                      >
                        {isPlaying ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                            <rect x="2" y="1" width="4" height="12" rx="1" />
                            <rect x="8" y="1" width="4" height="12" rx="1" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                            <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors backdrop-blur-sm"
                      >
                        {isMuted ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" stroke="none"/>
                            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
