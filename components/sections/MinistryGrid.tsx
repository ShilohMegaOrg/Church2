"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { StaggerChildren } from "@/components/animations/StaggerChildren"
import { FadeInItem } from "@/components/animations/FadeInItem"
import type { Ministry } from "@/lib/cms/types"

interface MinistryGridProps {
  ministries: Ministry[]
  showAll?: boolean
}

export function MinistryGrid({ ministries, showAll = false }: MinistryGridProps) {
  const displayMinistries = showAll ? ministries : ministries.slice(0, 3)

  return (
    <div className="space-y-8">
      <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto" role="list">
        {displayMinistries.map((ministry) => (
          <FadeInItem key={ministry.slug}>
            <Link href={`/ministries/${ministry.slug}`} role="listitem">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group h-full transition-all hover:shadow-lg">
                  <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary-600 to-primary-800">
                    {ministry.image ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                      >
                        <Image
                          src={ministry.image.url}
                          alt={ministry.image.alt || ministry.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ArrowRight className="h-16 w-16 text-white/30" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {ministry.title}
                    </CardTitle>
                    <CardDescription>{ministry.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </FadeInItem>
        ))}
      </StaggerChildren>

      {!showAll && ministries.length > 3 && (
        <div className="text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center text-primary hover:underline"
          >
            View All Ministries
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

