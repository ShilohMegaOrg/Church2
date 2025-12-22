"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  frequency: z.enum(["one-time", "monthly", "weekly"]),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional(),
})

type DonationFormData = z.infer<typeof donationSchema>

const presetAmounts = [25, 50, 100, 250, 500]

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      frequency: "one-time",
    },
  })

  const frequency = watch("frequency")

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true)
    try {
      // TODO: Integrate with payment gateway (Stripe/PayPal)
      // For now, this is a placeholder
      console.log("Processing donation:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Redirect to thank you page
      window.location.href = "/give/thank-you"
    } catch (error) {
      console.error("Donation error:", error)
      alert("There was an error processing your donation. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl">Support Our Church</CardTitle>
        <CardDescription className="text-lg">
          Your generosity helps us serve our community and spread the gospel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount)
                    setValue("amount", amount)
                  }}
                  className={`rounded-md border p-3 font-semibold transition-colors ${
                    selectedAmount === amount
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <input
                type="number"
                placeholder="Custom amount"
                {...register("amount", { valueAsNumber: true })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  if (!isNaN(value)) {
                    setSelectedAmount(null)
                    setValue("amount", value)
                  }
                }}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-destructive">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {(["one-time", "weekly", "monthly"] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setValue("frequency", freq)}
                  className={`rounded-md border p-3 text-sm font-medium capitalize transition-colors ${
                    frequency === freq
                      ? "border-primary bg-primary text-white"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {freq.replace("-", " ")}
                </button>
              ))}
            </div>
            {errors.frequency && (
              <p className="mt-1 text-sm text-destructive">{errors.frequency.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Your Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message (Optional)</label>
            <textarea
              {...register("message")}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Add a note with your donation..."
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Continue to Payment"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your donation is secure and encrypted. We use industry-standard payment processing.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

