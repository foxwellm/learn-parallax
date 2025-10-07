"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useRef } from "react";

/**
 * Convert a 0..1 motion value into a smoothed Y transform (px).
 */
function useParallax(value: MotionValue<number>, distance: number, stiffness = 120, damping = 30) {
  const yRaw = useTransform(value, [0, 1], [distance, -distance]); // when section enters -> moves toward center -> continues
  return useSpring(yRaw, { stiffness, damping, mass: 0.5 });
}

/**
 * One section that has its own local parallax.
 */
function ParallaxSection({
  id,
  src,
  depth = 520,
}: {
  id: number;
  src: string;
  depth?: number; // how far the element moves (px)
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Local scroll progress for this section only
  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" -> when section top hits bottom of viewport = 0
    // "end start" -> when section bottom hits top of viewport = 1
    offset: ["start end", "end start"],
  });

  // Smoothed transforms for image and title (title moves slightly less)
  const yImage = useParallax(scrollYProgress, depth, 140, 35);
  const yTitle = useParallax(scrollYProgress, depth * 0.55, 140, 36); // .55 gives some visual offset

  return (
    <section ref={ref} className="parallax-section">
      <motion.div style={{ y: yImage }} className="img-wrap">
        <img src={src} alt={`Image ${id}`} />
      </motion.div>

      <motion.h2 style={{ y: yTitle }} className="section-title">
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

/**
 * Page with multiple local-parallax sections
 */
export default function Page() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <ParallaxSection key={i} id={i} src="/workprofile.jpeg" />
      ))}

      <Styles />
    </div>
  );
}

/** Simple styles (keep scroll-snap OFF) */
function Styles() {
  return (
    <style>{`
      html, body {
        height: 100%;
      }

      /* IMPORTANT: don't use snap-type: it causes hard jumps */
      /* html { scroll-snap-type: y mandatory; } */

      body {
        margin: 0;
        background: #000;
        color: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .parallax-section {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: visible; /* allow motioned elements to go outside */
        padding: 2rem;
      }

      .img-wrap {
        width: 320px;
        height: 420px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        background: #111;
      }

      .img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .section-title {
        position: absolute;

        left: calc(50% + 220px);
        color: #8df0cc;
        font-family: "Azeret Mono", monospace;
        font-weight: 800;
        font-size: clamp(28px, 4.4vw, 54px);
        letter-spacing: -2px;
        pointer-events: none;
      }

      @media (max-width: 900px) {
        .section-title {
          left: calc(50% + 160px);
          font-size: clamp(24px, 4.5vw, 40px);
        }
      }

      @media (max-width: 600px) {
        .img-wrap { width: 200px; height: 260px; }
        .section-title { left: calc(50% + 130px); font-size: 22px; }
      }
    `}</style>
  );
}
