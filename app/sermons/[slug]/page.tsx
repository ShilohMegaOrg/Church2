import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { getSermon, getSermons } from "@/lib/cms/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Play, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const sermons = await getSermons()
  return sermons.map((sermon) => ({
    slug: sermon.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const sermon = await getSermon(slug)

  if (!sermon) {
    return {
      title: "Sermon Not Found",
    }
  }

  return {
    title: `${sermon.title} | RCCG Shiloh Mega Parish`,
    description: sermon.description,
  }
}

export default async function SermonPage({ params }: PageProps) {
  const { slug } = await params
  const sermon = await getSermon(slug)

  if (!sermon) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {sermon.image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={sermon.image.url}
              alt={sermon.image.alt || sermon.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <div className="mb-6">
          {sermon.series && (
            <p className="mb-2 text-sm font-semibold text-primary">{sermon.series}</p>
          )}
          <h1 className="mb-4 text-4xl font-bold">{sermon.title}</h1>
          <p className="mb-6 text-xl text-muted-foreground">{sermon.description}</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Date</p>
                  <p className="text-lg">{format(sermon.date, "MMMM d, yyyy")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {sermon.speaker && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Speaker</p>
                    <p className="text-lg">{sermon.speaker}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {(sermon.videoUrl || sermon.audioUrl) && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            {sermon.videoUrl && (
              <Button asChild size="lg" className="flex-1">
                <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
                </a>
              </Button>
            )}
            {sermon.audioUrl && (
              <Button asChild size="lg" variant="outline" className="flex-1">
                <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer">
                  <Headphones className="mr-2 h-4 w-4" />
                  Listen to Audio
                </a>
              </Button>
            )}
          </div>
        )}

        {sermon.content && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sermon.content }}
          />
        )}
      </div>
    </div>
  )
}

