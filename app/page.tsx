import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Server, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"
import { constants } from "@/lib/constants"

export default function Home() {
  return (
    <div className="relative">
      <GlowEffect />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            High-Performance Hosting Solutions
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Reliable, scalable, and secure hosting services for your business. Deploy in seconds, scale with ease.
          </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/buy">
            <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/community">
            <Button size="lg" variant="outline">
            Join Community
            </Button>
          </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
          <Image
            src="/images/hero.png?height=450&width=450"
            alt="Server Illustration"
            fill
            className="object-contain"
            priority
          />
          </div>
        </div>
        </div>
      </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/40 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Nylon Hosting</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our hosting solutions are designed to provide the best performance, security, and reliability for your
          applications.
          </p>
        </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-10 md:grid-cols-3">
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
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Choose the perfect plan for your needs. No hidden fees, no surprises.
          </p>
        </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-10 md:grid-cols-3">
        {constants.plans.map((plan, index) => (
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
            <Link href={`/buy/${plan.type}`} className="w-full">
            <Button size="lg" className="w-full" variant={plan.popular ? "default" : "outline"}>
              Get Started
            </Button>
            </Link>
          </CardFooter>
          </Card>
        ))}
        </div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/40 py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Join thousands of satisfied customers who trust Nylon Hosting for their infrastructure needs.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/sign-up">
          <Button size="lg" className="group">
            Create Account
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          </Link>
          <Link href="/faq">
          <Button size="lg" variant="outline">
            Learn More
          </Button>
          </Link>
        </div>
        </div>
      </div>
      </section>
    </div>
  )
}
