"use client"

import { useState } from "react"
import { MinistryGrid } from "./MinistryGrid"
import { Button } from "@/components/ui/button"
import type { Ministry, MinistryCategory } from "@/lib/cms/types"

interface MinistryCategoriesProps {
  ministries: Ministry[]
}

const categories: { value: MinistryCategory | "all"; label: string }[] = [
  { value: "all", label: "All Ministries" },
  { value: "age-groups", label: "Age Groups" },
  { value: "service", label: "Service Ministries" },
  { value: "community", label: "Community Groups" },
]

export function MinistryCategories({ ministries }: MinistryCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<MinistryCategory | "all">("all")

  const filteredMinistries =
    selectedCategory === "all"
      ? ministries
      : ministries.filter((m) => m.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.value)}
            className="capitalize"
          >
            {category.label}
          </Button>
        ))}
      </div>

      <MinistryGrid ministries={filteredMinistries} showAll />
    </div>
  )
}

