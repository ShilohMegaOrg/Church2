import { MinistryCategories } from "@/components/sections/MinistryCategories"
import { getMinistries } from "@/lib/cms/queries"

export const metadata = {
  title: "Ministries | RCCG Shiloh Mega Parish",
  description: "Explore our various ministries and find your place to serve and grow.",
}

export default async function MinistriesPage() {
  const ministries = await getMinistries()

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Our Ministries</h1>
        <p className="text-lg text-muted-foreground">
          Discover ways to get involved, grow in faith, and serve our community
        </p>
      </div>

      <MinistryCategories ministries={ministries} />
    </div>
  )
}

