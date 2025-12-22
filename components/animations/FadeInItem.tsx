"use client"

import { motion } from "framer-motion"

interface FadeInItemProps {
  children: React.ReactNode
  className?: string
}

export function FadeInItem({ children, className }: FadeInItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.21, 1.11, 0.81, 0.99],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

