import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Thank You | RCCG Shiloh Mega Parish",
  description: "Thank you for your generous donation.",
}

export default function ThankYouPage() {
  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your donation has been received successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            We are grateful for your generosity and support. Your contribution helps us 
            continue serving our community and spreading the gospel.
          </p>
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email shortly with your donation receipt.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/give">Make Another Donation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

