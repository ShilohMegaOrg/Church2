import { PastorCard } from "@/components/sections/PastorCard"
import { getPastors } from "@/lib/cms/queries"

export const metadata = {
  title: "Pastors | RCCG Shiloh Mega Parish",
  description: "Meet our pastoral team at RCCG Shiloh Mega Parish.",
}

export default async function PastorsPage() {
  const pastors = await getPastors()

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Meet the Pastors</h1>
        <p className="text-lg text-muted-foreground">
          Our leadership team dedicated to serving you
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pastors.map((pastor) => (
          <PastorCard
            key={pastor.id}
            name={pastor.name}
            title={pastor.title}
            image={pastor.image.url}
            bio={pastor.bio}
          />
        ))}
      </div>
    </div>
  )
}

