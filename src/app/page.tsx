"use client";

import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

// Parallax helper
function useParallax(value: MotionValue<number>, distance: number, stiffness = 100, damping = 30) {
  const yRaw = useTransform(value, [0, 1], [-distance, distance]);
  const ySmooth = useSpring(yRaw, { stiffness, damping, mass: 0.5 });
  return ySmooth;
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Each layer uses its own spring for smooth parallax
  const y = useParallax(scrollYProgress, 300, 120, 35);

  return (
    <section className="img-container">
      <div ref={ref}>
        <img src={`/workprofile.jpeg`} alt="A London skyscraper" />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function Parallax() {
  const { scrollYProgress } = useScroll();

  // Smoothed global progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 0.5,
  });

  // For debug display
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return (
    <div id="example">
      {/* Scroll Progress Display */}
      <div className="fixed top-4 left-4 p-2 bg-black/50 rounded text-white z-20">
        Scroll Progress: {(progress * 100).toFixed(1)}%
      </div>

      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}

      {/* Progress Bar */}
      <motion.div className="progress" style={{ scaleX }} />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>{`
      html {
        scroll-snap-type: y mandatory;
      }

      .img-container {
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .img-container > div {
        width: 300px;
        height: 400px;
        margin: 20px;
        background: #f5f5f5;
        overflow: hidden;
      }

      .img-container img {
        width: 300px;
        height: 400px;
      }

      @media (max-width: 500px) {
        .img-container > div {
          width: 150px;
          height: 200px;
        }

        .img-container img {
          width: 150px;
          height: 200px;
        }
      }

      .img-container h2 {
        color: #8df0cc;
        margin: 0;
        font-family: "Azeret Mono", monospace;
        font-size: 50px;
        font-weight: 700;
        letter-spacing: -3px;
        line-height: 1.2;
        position: absolute;
        display: inline-block;
        top: calc(50% - 25px);
        left: calc(50% + 120px);
      }

      .progress {
        position: fixed;
        left: 0;
        right: 0;
        height: 5px;
        background: #8df0cc;
        bottom: 50px;
        transform: scaleX(0);
      }
    `}</style>
  );
}
