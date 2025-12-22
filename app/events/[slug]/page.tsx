import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { getEvent, getEvents } from "@/lib/cms/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `${event.title} | RCCG Shiloh Mega Parish`,
    description: event.description,
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {event.image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={event.image.url}
              alt={event.image.alt || event.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>
        <p className="mb-8 text-xl text-muted-foreground">{event.description}</p>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Date</p>
                  <p className="text-lg">{format(event.date, "EEEE, MMMM d, yyyy")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.time && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Time</p>
                    <p className="text-lg">{event.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {event.location && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Location</p>
                    <p className="text-lg">{event.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {event.content && (
          <div
            className="prose prose-lg mb-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        )}

        {event.registrationRequired && event.registrationUrl && (
          <Button asChild size="lg" className="w-full md:w-auto">
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              Register Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

