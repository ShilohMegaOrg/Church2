"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { StaggerChildren } from "@/components/animations/StaggerChildren"
import { FadeInItem } from "@/components/animations/FadeInItem"
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll"
import type { Testimonial } from "@/lib/cms/types"

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <FadeInOnScroll>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What People Are Saying</h2>
            <p className="text-muted-foreground">
              Stories from our community
            </p>
          </div>
        </FadeInOnScroll>

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
          {testimonials.map((testimonial, index) => (
            <FadeInItem key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-primary/20" role="listitem">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/50" />
                <p className="mb-4 text-muted-foreground">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
              </motion.div>
            </FadeInItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}

