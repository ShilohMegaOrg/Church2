"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/cms/types"

interface FeaturedEventsCarouselProps {
  events: Event[]
}

export function FeaturedEventsCarousel({ events }: FeaturedEventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || events.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, events.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
    setIsAutoPlaying(false)
  }

  if (events.length === 0) return null

  const currentEvent = events[currentIndex]

  return (
    <div className="relative">
      <div className="container mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">What's Happening</h2>
        <p className="text-lg text-muted-foreground">
          Join us for these special gatherings and activities
        </p>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-[450px] sm:h-[550px] md:h-[650px] w-full"
          >
            {currentEvent.image ? (
              <Image
                src={currentEvent.image.url}
                alt={currentEvent.image.alt || currentEvent.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-600 to-primary-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            
            {/* Top date banner */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3">
              <div className="container">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-white font-semibold">
                  <span>{format(currentEvent.date, "MMMM d")}</span>
                  {currentEvent.time && (
                    <>
                      <span className="text-white/70">|</span>
                      <span>{currentEvent.time}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="container relative z-10 flex h-full flex-col justify-end pb-6 sm:pb-8 md:pb-12 px-4 sm:px-6">
              <div className="max-w-3xl text-white w-full">
                <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                    <span className="break-words whitespace-normal font-medium">{format(currentEvent.date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  {currentEvent.time && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>{currentEvent.time}</span>
                    </div>
                  )}
                  {currentEvent.location && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-words">{currentEvent.location}</span>
                    </div>
                  )}
                </div>
                <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{currentEvent.title}</h3>
                <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 line-clamp-2 sm:line-clamp-none">{currentEvent.description}</p>
                <div className="flex flex-col gap-2.5 sm:gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all hover:scale-105 text-sm sm:text-base touch-manipulation">
                    <Link href={`/events/${currentEvent.slug}`}>Learn More</Link>
                  </Button>
                  {currentEvent.registrationRequired && currentEvent.registrationUrl && (
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all hover:scale-105 text-sm sm:text-base touch-manipulation">
                      <a href={currentEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                        Register Now
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {events.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/20 p-2.5 sm:p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30 touch-manipulation"
              aria-label="Previous event"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/20 p-2.5 sm:p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30 touch-manipulation"
              aria-label="Next event"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
              <div className="flex gap-2">
                {events.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

