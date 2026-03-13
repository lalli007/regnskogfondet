"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const slides = [
  {
    number: "01",
    stat: "80%",
    statLabel: "av verdens arter",
    body: "Regnskogene dekker bare 6% av jordens overflate, men er hjem til over 80% av alle land- og plantearter på kloden.",
    color: "from-green-900/40",
  },
  {
    number: "02",
    stat: "2,6 mrd",
    statLabel: "tonn CO₂ lagres årlig",
    body: "Regnskogene fungerer som planetens lunger — de absorberer enorme mengder CO₂ og bremser den globale oppvarmingen.",
    color: "from-emerald-900/40",
  },
  {
    number: "03",
    stat: "1,6 mrd",
    statLabel: "mennesker er avhengige",
    body: "Mer enn 1,6 milliarder mennesker er direkte avhengige av skoger for mat, vann, energi, medisiner og inntekt.",
    color: "from-teal-900/40",
  },
  {
    number: "04",
    stat: "17%",
    statLabel: "av Amazonas er borte",
    body: "Siden 1970 har mennesket ødelagt 17% av Amazonas. Vi nærmer oss en vippepunkt der skogen ikke lenger kan regenerere seg selv.",
    color: "from-red-900/30",
  },
  {
    number: "05",
    stat: "siden 1989",
    statLabel: "kjemper vi for skogen",
    body: "Regnskogfondet har i over 35 år støttet urfolks rettigheter og beskyttelse av regnskogen — fordi løsningen allerede finnes der.",
    color: "from-green-900/40",
  },
];

function Slide({
  slide,
  index,
  total,
  containerRef,
}: {
  slide: (typeof slides)[0];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({ target: containerRef });

  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const center = start + segmentSize / 2;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, center - 0.02, center + 0.02, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress, [start, center], [40, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, y, paddingLeft: "clamp(2.5rem, 8vw, 6rem)", paddingRight: "clamp(2.5rem, 8vw, 6rem)" }}
    >
      <div className="max-w-3xl w-full">
        <p className="text-green-400/60 text-sm tracking-widest uppercase mb-6">
          {slide.number} / {String(total).padStart(2, "0")}
        </p>
        <h2 className="text-7xl md:text-[9rem] font-light leading-none text-white mb-2">
          {slide.stat}
        </h2>
        <p className="text-green-400 text-xl md:text-2xl mb-8">{slide.statLabel}</p>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl">
          {slide.body}
        </p>
      </div>
    </motion.div>
  );
}

function ProgressBar({
  containerRef,
  total,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  total: number;
}) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute bottom-8 z-20" style={{ left: "clamp(2.5rem, 8vw, 6rem)", right: "clamp(2.5rem, 8vw, 6rem)" }}>
      <div className="flex gap-2">
        {slides.map((_, i) => {
          const segStart = i / total;
          const segEnd = (i + 1) / total;
          const segWidth = useTransform(
            scrollYProgress,
            [segStart, segEnd],
            ["0%", "100%"]
          );
          return (
            <div key={i} className="flex-1 h-px bg-white/20 overflow-hidden relative">
              <motion.div
                style={{ width: segWidth }}
                className="absolute inset-y-0 left-0 bg-green-400"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Høyde = 100vh sticky + slides * 100vh scroll
  const scrollHeight = `${(slides.length + 1) * 100}vh`;

  return (
    <section ref={containerRef} style={{ height: scrollHeight }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080c08]">
        {/* Bakgrunns-gradient som skifter */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 to-black" />

        {/* Store dekorative tall i bakgrunnen */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none select-none">
          {slides.map((slide, i) => (
            <SlideBackgroundNumber
              key={i}
              index={i}
              total={slides.length}
              number={slide.number}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Slides */}
        {slides.map((slide, i) => (
          <Slide
            key={i}
            slide={slide}
            index={i}
            total={slides.length}
            containerRef={containerRef}
          />
        ))}

        {/* Progress */}
        <ProgressBar containerRef={containerRef} total={slides.length} />
      </div>
    </section>
  );
}

function SlideBackgroundNumber({
  index,
  total,
  number,
  containerRef,
}: {
  index: number;
  total: number;
  number: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const center = start + segmentSize / 2;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, center - 0.02, center + 0.02, end],
    [0, 0.04, 0.04, 0]
  );

  return (
    <motion.span
      style={{ opacity, position: "absolute" }}
      className="text-[30vw] font-bold text-white leading-none select-none right-[-2vw]"
    >
      {number}
    </motion.span>
  );
}
