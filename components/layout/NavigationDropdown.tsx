"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Ministry, MinistryCategory } from "@/lib/cms/types"

interface NavigationDropdownProps {
  ministries: Ministry[]
  className?: string
}

const categoryLabels: Record<MinistryCategory, string> = {
  "age-groups": "Age Groups",
  service: "Service Ministries",
  community: "Community Groups",
}

export function NavigationDropdown({ ministries, className }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const ministriesByCategory = ministries.reduce(
    (acc, ministry) => {
      if (!acc[ministry.category]) {
        acc[ministry.category] = []
      }
      acc[ministry.category].push(ministry)
      return acc
    },
    {} as Record<MinistryCategory, Ministry[]>
  )

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Ministries
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-lg border bg-background shadow-xl max-h-[85vh] overflow-y-auto overscroll-contain dropdown-scroll"
              style={{ 
                maxWidth: 'min(calc(100vw - 1rem), 24rem)',
                minWidth: '20rem',
              }}
            >
              <div className="p-3 min-w-0">
                {Object.entries(ministriesByCategory).map(([category, categoryMinistries]) => (
                  <div
                    key={category}
                    className="mb-3 last:mb-0"
                  >
                    <div className="px-3 py-2 mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/50 rounded-md">
                      {categoryLabels[category as MinistryCategory]}
                    </div>
                    <div className="space-y-0.5">
                      {categoryMinistries.map((ministry) => (
                        <Link
                          key={ministry.id}
                          href={`/ministries/${ministry.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground text-foreground w-full"
                        >
                          {ministry.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="border-t border-border mt-3 pt-3">
                  <Link
                    href="/ministries"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
                  >
                    View All Ministries →
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

