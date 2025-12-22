import { cmsClient } from "./client"
import type { Pastor, Ministry, Event, Sermon, Testimonial, Page } from "./types"

export async function getPastors(): Promise<Pastor[]> {
  return cmsClient.getPastors()
}

export async function getPastor(id: string): Promise<Pastor | null> {
  return cmsClient.getPastor(id)
}

export async function getMinistries(): Promise<Ministry[]> {
  return cmsClient.getMinistries()
}

export async function getMinistry(slug: string): Promise<Ministry | null> {
  return cmsClient.getMinistry(slug)
}

export async function getEvents(limit?: number): Promise<Event[]> {
  return cmsClient.getEvents(limit)
}

export async function getEvent(slug: string): Promise<Event | null> {
  return cmsClient.getEvent(slug)
}

export async function getSermons(limit?: number): Promise<Sermon[]> {
  return cmsClient.getSermons(limit)
}

export async function getSermon(slug: string): Promise<Sermon | null> {
  return cmsClient.getSermon(slug)
}

export async function getLatestSermon(): Promise<Sermon | null> {
  const sermons = await getSermons(1)
  return sermons.length > 0 ? sermons[0] : null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return cmsClient.getTestimonials()
}

export async function getPage(slug: string): Promise<Page | null> {
  return cmsClient.getPage(slug)
}

