"use client"

import { motion } from "motion/react"

interface ShiningTextProps {
  text: string
  className?: string
}

export function ShiningText({ text, className = "" }: ShiningTextProps) {
  return (
    <motion.span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #ABABAB 0%, #0A0A0A 40%, #0A0A0A 60%, #ABABAB 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["100% 0%", "-100% 0%"],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  )
}
