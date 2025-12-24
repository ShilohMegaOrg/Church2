"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface StaggerChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  staggerDelay?: number
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: StaggerChildrenProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

