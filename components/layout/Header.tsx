"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "./Navigation"
import type { Ministry } from "@/lib/cms/types"

interface HeaderProps {
  ministries?: Ministry[]
}

export function Header({ ministries = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/Chruch_logo-shilo2-1-427x213.webp"
            alt="RCCG Shiloh Mega Parish Logo"
            width={120}
            height={60}
            className="h-8 sm:h-10 w-auto"
            priority
          />
          <span className="text-lg sm:text-xl font-bold text-primary hidden sm:inline">RCCG Shiloh</span>
        </Link>

        <Navigation className="hidden md:flex" ministries={ministries} />

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/give">Donate</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t overflow-hidden md:hidden"
          >
            <Navigation className="flex flex-col p-4" ministries={ministries} />
            <div className="p-4">
              <Button asChild className="w-full">
                <Link href="/give">Donate</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

