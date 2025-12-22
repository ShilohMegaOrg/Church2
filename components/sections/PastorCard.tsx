"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface PastorCardProps {
  name: string
  title: string
  image: string
  bio?: string
}

export function PastorCard({ name, title, image, bio }: PastorCardProps) {
  // Assistant Pastor uses object-cover which works well for her image
  // Pastor's image needs specific positioning to show face - using center with top bias
  const isPastorOlise = name.includes("Moses Olise") || image.includes("pastorOlise")
  const imageClassName = isPastorOlise 
    ? "object-cover object-[center_25%]" 
    : "object-cover"

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative h-64 w-full overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={image}
              alt={name}
              fill
              className={imageClassName}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-1 text-xl font-semibold">{name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{title}</p>
          {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

