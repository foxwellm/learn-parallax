"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";

interface AnimatedSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedSection({ id, children, className }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={clsx(
        "relative flex flex-col justify-center min-h-screen md:h-screen px-6 md:px-12 py-12",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
