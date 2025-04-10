import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ChevronRight, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"

export const metadata: Metadata = {
  title: "Dedicated Servers - Nylon Hosting",
  description: "High-performance dedicated servers for mission-critical applications",
}

const serverPlans = [
  {
    name: "Standard Server",
    description: "For high-traffic websites and applications",
    price: 99.99,
    popular: false,
    specs: {
      cpu: "Intel Xeon E-2236 (6 cores, 12 threads)",
      ram: "16GB DDR4 ECC",
      storage: "2 x 500GB SSD",
      bandwidth: "Unmetered (10 Gbps)",
    },
    features: [
      "24/7 Premium Support",
      "Free Domain",
      "99.99% Uptime Guarantee",
      "Daily Backups",
      "DDoS Protection",
      "Root Access",
    ],
  },
  {
    name: "Performance Server",
    description: "For resource-intensive applications",
    price: 199.99,
    popular: true,
    specs: {
      cpu: "Intel Xeon E-2288G (8 cores, 16 threads)",
      ram: "32GB DDR4 ECC",
      storage: "2 x 1TB NVMe SSD",
      bandwidth: "Unmetered (10 Gbps)",
    },
    features: [
      "24/7 Premium Support",
      "Free Domain",
      "99.99% Uptime Guarantee",
      "Hourly Backups",
      "Advanced DDoS Protection",
      "Root Access",
      "Load Balancing",
    ],
  },
  {
    name: "Enterprise Server",
    description: "For mission-critical applications",
    price: 299.99,
    popular: false,
    specs: {
      cpu: "Dual Intel Xeon Silver 4210 (20 cores, 40 threads)",
      ram: "64GB DDR4 ECC",
      storage: "4 x 1TB NVMe SSD",
      bandwidth: "Unmetered (10 Gbps)",
    },
    features: [
      "24/7 Premium Support",
      "Free Domain",
      "99.999% Uptime Guarantee",
      "Continuous Backups",
      "Advanced DDoS Protection",
      "Root Access",
      "Load Balancing",
      "Dedicated Account Manager",
    ],
  },
]

const whyChooseUs = [
  {
    title: "Maximum Performance",
    description:
      "With dedicated hardware resources, your applications will run at peak performance without being affected by other users.",
  },
  {
    title: "Enhanced Security",
    description:
      "Dedicated servers provide an isolated environment with advanced security features to keep your data safe.",
  },
  {
    title: "Complete Control",
    description:
      "Full root access gives you complete control over your server configuration, software, and security settings.",
  },
]

export default function ServersPage() {
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
            <span>Dedicated Servers</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Dedicated Servers</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Our dedicated servers provide maximum performance and security for high-traffic websites, enterprise
            applications, and resource-intensive workloads.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {serverPlans.map((plan, index) => (
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
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  ${plan.price}
                  <span className="ml-1 text-xl font-normal text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Hardware Specifications</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">CPU:</span>
                      <span className="text-muted-foreground">{plan.specs.cpu}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">RAM:</span>
                      <span className="text-muted-foreground">{plan.specs.ram}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">Storage:</span>
                      <span className="text-muted-foreground">{plan.specs.storage}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-medium">Bandwidth:</span>
                      <span className="text-muted-foreground">{plan.specs.bandwidth}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Features</h3>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Configure & Order
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Why Choose Our Dedicated Servers?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
