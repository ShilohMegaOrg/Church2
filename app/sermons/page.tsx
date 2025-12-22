import { SermonCard } from "@/components/sections/SermonCard"
import { getSermons } from "@/lib/cms/queries"

export const metadata = {
  title: "Sermons | RCCG Shiloh Mega Parish",
  description: "Listen to and watch our sermon archive.",
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Sermon Archive</h1>
        <p className="text-lg text-muted-foreground">
          Listen to and watch messages from our services
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon) => (
          <SermonCard
            key={sermon.id}
            slug={sermon.slug}
            title={sermon.title}
            description={sermon.description}
            date={sermon.date}
            speaker={sermon.speaker}
            series={sermon.series}
            image={sermon.image?.url}
            videoUrl={sermon.videoUrl}
            audioUrl={sermon.audioUrl}
          />
        ))}
      </div>

      {sermons.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No sermons available at this time.</p>
        </div>
      )}
    </div>
  )
}

