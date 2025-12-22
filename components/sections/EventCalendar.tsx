"use client"

import Image from "next/image"
import { format } from "date-fns"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Event as EventType } from "@/lib/cms/types"

interface EventCalendarProps {
  events: EventType[]
  showAll?: boolean
}

export function EventCalendar({ events, showAll = false }: EventCalendarProps) {
  const displayEvents = showAll ? events : events.slice(0, 6)
  const sortedEvents = [...displayEvents].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {sortedEvents.map((event) => (
          <Card key={event.slug} className="flex flex-col" role="listitem">
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary-600 to-primary-800">
              {event.image ? (
                <Image
                  src={event.image.url}
                  alt={event.image.alt || event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarIcon className="h-16 w-16 text-white/30" />
                </div>
              )}
            </div>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(event.date, "MMMM d, yyyy")}</span>
                {event.time && (
                  <>
                    <Clock className="ml-2 h-4 w-4" />
                    <span>{event.time}</span>
                  </>
                )}
              </div>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
              {event.location && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/events/${event.slug}`}>Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && events.length > 6 && (
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

