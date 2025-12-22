"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["general", "prayer", "visitor"]).default("general"),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  type?: "general" | "prayer" | "visitor"
  title?: string
  description?: string
}

export function ContactForm({
  type = "general",
  title = "Get in Touch",
  description = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Integrate with email service (SendGrid, Resend, etc.)
      // For now, this is a placeholder
      console.log("Sending message:", data)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error("Contact form error:", error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for reaching out. We'll get back to you soon.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Name *</label>
              <input
                type="text"
                {...register("name")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="John Doe"
                aria-label="Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="john@example.com"
                aria-label="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone (Optional)</label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="(555) 123-4567"
                aria-label="Phone"
              />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Subject *</label>
              <input
                type="text"
                {...register("subject")}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="How can we help?"
                aria-label="Subject"
              />
            {errors.subject && (
              <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message *</label>
            <textarea
              {...register("message")}
              rows={6}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="Your message here..."
              aria-label="Message"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

