// components/Section.tsx
import React from "react";
import clsx from "clsx";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        // fills viewport on large screens, flexible on small
        "flex flex-col justify-center snap-start",
        "min-h-screen md:h-screen",
        "px-6 md:px-12 lg:px-24 py-12 md:py-0",
        className
      )}
    >
      {children}
    </section>
  );
}
