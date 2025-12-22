"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ServiceCountdown } from "./ServiceCountdown"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Full-width background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop&q=90"
          alt="RCCG Shiloh Mega Parish - A place of salvation and hope"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Lighter overlay to let image show through more */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </motion.div>
      
      {/* Subtle countdown in top right corner (desktop) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-8 right-4 z-20 hidden md:block"
      >
        <ServiceCountdown />
      </motion.div>
      
      {/* Countdown for mobile - smaller, top center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 md:hidden"
      >
        <ServiceCountdown />
      </motion.div>
      
      <div className="container relative z-10 px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl sm:mb-5 md:text-5xl md:mb-6 lg:text-6xl xl:text-7xl"
          >
            Welcome Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-base text-white/90 sm:text-lg sm:mb-8 md:text-xl md:mb-10 lg:text-2xl"
          >
            A Place to Belong, Grow, and Serve
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all hover:scale-105">
              <Link href="/visit">
                Plan Your Visit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}

