import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, Server, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"
import { constants } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Buy Hosting - Nylon Hosting",
  description: "Choose the perfect hosting plan for your needs",
}

const hostingPlans = [
  {
    title: "VPS Hosting",
    description: "Virtual Private Servers",
    icon: <Server className="h-6 w-6 text-primary" />,
    details: [
      "Full root access and control",
      "Dedicated CPU, RAM, and storage",
      "Instant scaling options",
      "SSD storage for faster performance",
    ],
    price: "$9.99",
    link: "/buy/vps",
    buttonText: "View VPS Plans",
  },
  {
    title: "Dedicated Servers",
    description: "High-performance hardware",
    icon: <Shield className="h-6 w-6 text-primary" />,
    details: [
      "Exclusive hardware resources",
      "Enterprise-grade security",
      "Advanced DDoS protection",
      "Customizable hardware configurations",
    ],
    price: "$99.99",
    link: "/buy/servers",
    buttonText: "View Dedicated Servers",
  },
]

export default function BuyPage() {
  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Choose Your Hosting Plan</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Select the perfect hosting solution for your needs. All plans include 24/7 support, 99.9% uptime guarantee,
            and a 30-day money-back guarantee.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {hostingPlans.map((plan, index) => (
            <Card key={index} className="flex flex-col border-2 transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3">{plan.icon}</div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="mb-4">{plan.details[0]}</p>
                <div className="mt-6 space-y-2">
                  {plan.details.map((detail, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={plan.link} className="w-full">
                  <Button className="w-full">
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Why Choose Nylon Hosting?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {constants.features.map((feature, index) => (
              <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader className="space-y-1 pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon === "server" && <Server className="h-6 w-6 text-primary" />}
                    {feature.icon === "zap" && <Zap className="h-6 w-6 text-primary" />}
                    {feature.icon === "shield" && <Shield className="h-6 w-6 text-primary" />}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
