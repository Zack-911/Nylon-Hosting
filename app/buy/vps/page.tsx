import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"

export const metadata: Metadata = {
  title: "VPS Hosting - Nylon Hosting",
  description: "Choose the perfect VPS hosting plan for your needs",
}

const vpsPlans = [
  {
    name: "Starter VPS",
    description: "Perfect for small projects and websites",
    price: 9.99,
    popular: false,
    features: [
      "1 vCPU Core",
      "2GB RAM",
      "20GB SSD Storage",
      "1TB Bandwidth",
      "24/7 Support",
      "99.9% Uptime Guarantee",
    ],
  },
  {
    name: "Pro VPS",
    description: "Ideal for growing businesses",
    price: 29.99,
    popular: true,
    features: [
      "2 vCPU Cores",
      "4GB RAM",
      "50GB SSD Storage",
      "3TB Bandwidth",
      "24/7 Priority Support",
      "Free Domain",
      "99.9% Uptime Guarantee",
      "Weekly Backups",
    ],
  },
  {
    name: "Business VPS",
    description: "For high-traffic websites and applications",
    price: 59.99,
    popular: false,
    features: [
      "4 vCPU Cores",
      "8GB RAM",
      "100GB SSD Storage",
      "5TB Bandwidth",
      "24/7 Priority Support",
      "Free Domain",
      "99.9% Uptime Guarantee",
      "Daily Backups",
      "DDoS Protection",
    ],
  },
  {
    name: "Enterprise VPS",
    description: "For mission-critical applications",
    price: 89.99,
    popular: false,
    features: [
      "8 vCPU Cores",
      "16GB RAM",
      "200GB SSD Storage",
      "10TB Bandwidth",
      "24/7 Premium Support",
      "Free Domain",
      "99.99% Uptime Guarantee",
      "Hourly Backups",
      "Advanced DDoS Protection",
      "Load Balancing",
    ],
  },
]

const faqItems = [
  {
    question: "What is a VPS?",
    answer:
      "A Virtual Private Server (VPS) is a virtualized server that simulates a dedicated server within a shared hosting environment. It provides dedicated resources and full root access.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can easily upgrade your VPS plan at any time through your dashboard. The upgrade process is seamless and typically takes just a few minutes.",
  },
  {
    question: "What operating systems are available?",
    answer:
      "We offer a variety of Linux distributions including Ubuntu, CentOS, Debian, and more. Windows Server is also available for an additional fee.",
  },
  {
    question: "How long does it take to set up a VPS?",
    answer:
      "Your VPS will be provisioned and ready to use within minutes after your order is processed. You'll receive login details via email.",
  },
]

export default function VpsPage() {
  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/buy" className="hover:text-primary">
              Buy
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>VPS Hosting</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">VPS Hosting Plans</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Our VPS hosting plans provide dedicated resources and full root access, perfect for websites, applications,
            and development environments.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vpsPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 transition-all hover:shadow-md ${plan.popular ? "border-primary" : "hover:border-primary/50"}`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  ${plan.price}
                  <span className="ml-1 text-xl font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-lg border bg-muted/40 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {faqItems.map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
