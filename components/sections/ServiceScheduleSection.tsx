"use client"

import Image from "next/image"
import { ServiceSchedule } from "./ServiceSchedule"

export function ServiceScheduleSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fullPhoto_Homepage.png"
          alt="Church community and worship"
          fill
          className="object-cover"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>
      
      <div className="container relative z-10">
        <ServiceSchedule />
      </div>
    </section>
  )
}

