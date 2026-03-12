"use client";

import { motion } from "framer-motion";

type TitleProps = {
  title: string;
  description: string;
  align?: "center" | "left" | "right";
};

export default function Title({
  title,
  description,
  align = "center",
}: TitleProps) {
  // Simple animation for letters.........
  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Container controls the timing..................
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const alignmentClasses = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  const splitText = (text: string) => text.split("");

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center mb-8">
      {/* Title */}
      <motion.h1
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`text-2xl md:text-3xl font-bold mb-2 max-w-xl ${alignmentClasses[align]}`}
      >
        {splitText(title).map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`text-sm text-foreground/60 max-w-xl ${alignmentClasses[align]}`}
      >
        {splitText(description).map((char, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
