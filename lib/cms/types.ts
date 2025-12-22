export interface ImageAsset {
  url: string
  width?: number
  height?: number
  alt?: string
}

export interface Pastor {
  id: string
  name: string
  title: string
  bio?: string
  image: ImageAsset
}

export type MinistryCategory = "age-groups" | "service" | "community"

export interface Ministry {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  image: ImageAsset
  leader?: string
  category: MinistryCategory
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  date: Date
  time?: string
  location?: string
  image?: ImageAsset
  registrationRequired?: boolean
  registrationUrl?: string
  featured?: boolean
}

export interface Sermon {
  id: string
  slug: string
  title: string
  description: string
  content?: string
  date: Date
  speaker?: string
  series?: string
  image?: ImageAsset
  videoUrl?: string
  audioUrl?: string
  duration?: number
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  content: string
  image?: ImageAsset
}

export interface Page {
  id: string
  slug: string
  title: string
  content: string
  seoTitle?: string
  seoDescription?: string
}

