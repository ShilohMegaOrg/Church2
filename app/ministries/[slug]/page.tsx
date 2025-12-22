import { notFound } from "next/navigation"
import Image from "next/image"
import { getMinistry, getMinistries } from "@/lib/cms/queries"
import { Card, CardContent } from "@/components/ui/card"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const ministries = await getMinistries()
  return ministries.map((ministry) => ({
    slug: ministry.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const ministry = await getMinistry(slug)

  if (!ministry) {
    return {
      title: "Ministry Not Found",
    }
  }

  return {
    title: `${ministry.title} | RCCG Shiloh Mega Parish`,
    description: ministry.description,
  }
}

export default async function MinistryPage({ params }: PageProps) {
  const { slug } = await params
  const ministry = await getMinistry(slug)

  if (!ministry) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
          <Image
            src={ministry.image.url}
            alt={ministry.image.alt || ministry.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <h1 className="mb-4 text-4xl font-bold">{ministry.title}</h1>
        <p className="mb-6 text-xl text-muted-foreground">{ministry.description}</p>

        {ministry.leader && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-muted-foreground">Ministry Leader</p>
              <p className="text-lg">{ministry.leader}</p>
            </CardContent>
          </Card>
        )}

        {ministry.content && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: ministry.content }}
          />
        )}
      </div>
    </div>
  )
}

