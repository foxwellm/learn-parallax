"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track scroll inside the main container
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

    const [progress, setProgress] = useState(0);

  // Update state whenever scrollYProgress changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  // Map scroll to parallax movement (px)
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <main
      ref={scrollRef}
      className="relative h-screen overflow-y-scroll bg-gradient-to-b from-sky-300 to-blue-900"
    >
     <div className="fixed top-4 left-4 p-2 bg-black/50 rounded text-white">
        Scroll Progress: {(progress * 100).toFixed(1)}%
      </div>

      {/* Parallax Background Layers */}
      <motion.img
        src="/mountains.svg"
        alt="Mountains"
        style={{ y: yBg }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-70 scale-[0.25] origin-bottom"
      />

      <motion.img
        src="/trees.svg"
        alt="Trees mid"
        style={{ y: yMid }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-90 scale-[0.25] origin-bottom"
      />

      <motion.img
        src="/trees.svg"
        alt="Trees front"
        style={{ y: yFront }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto opacity-100 scale-[0.25] origin-bottom"
      />

      {/* Content Sections */}
      <div className="relative z-10">
        <AnimatedSection className="bg-transparent text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome</h1>
          <p className="text-xl md:text-2xl">Scroll down to explore the parallax effect!</p>
        </AnimatedSection>

        <AnimatedSection className="bg-transparent text-white">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">About</h2>
          <p className="text-lg md:text-xl max-w-xl">
            Each section fades in and slides up when it enters the viewport, while the background
            layers move at different speeds.
          </p>
        </AnimatedSection>

        <AnimatedSection className="bg-transparent text-white">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Projects</h2>
          <p className="text-lg md:text-xl max-w-xl">
            You can add images, cards, or interactive content in each section — everything animates
            smoothly with scroll.
          </p>
        </AnimatedSection>

        <AnimatedSection className="bg-transparent text-white">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Contact</h2>
          <p className="text-lg md:text-xl max-w-xl">This is the last section of the demo.</p>
        </AnimatedSection>
      </div>
    </main>
  );
}
