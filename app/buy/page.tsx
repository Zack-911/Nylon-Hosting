"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CpuIcon as Gpu, ArrowRight, Globe, Bot, Database } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import styles from "@/styles/modules/animations.module.css"

export default function BuyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative">

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                Nylon Hosting Service Marketplace
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Find the Perfect Solution
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Explore our range of high-performance computing resources, hosting solutions, and storage options.
              </p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Our Product Categories</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose from our wide range of services designed to meet your specific needs.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Web Hosting */}
              <Link href="/buy/hosting" className="block">
                <Card className={`bg-[var(--bg-card)] border-slate-800 h-full ${styles.cardHover}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src="/buy/hosting.png?height=300&width=600"
                      alt="Web Hosting"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">Web Hosting</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-slate-300 flex-grow">
                    <p>Reliable hosting solutions for websites, applications, and Discord bots with 24/7 uptime.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        Website Hosting
                      </Badge>
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        Discord Bot Hosting
                      </Badge>
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        VPS
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Explore Hosting
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              {/* Cloud Storage */}
              <Link href="/buy/cloudstorage" className="block">
                <Card className={`bg-[var(--bg-card)] border-slate-800 h-full ${styles.cardHover}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src="/buy/cloudstorage.png?height=300&width=600"
                      alt="Cloud Storage"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">Cloud Storage</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-slate-300 flex-grow">
                    <p>Secure, scalable cloud storage solutions for your data with high-speed access and redundancy.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        Object Storage
                      </Badge>
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        Block Storage
                      </Badge>
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                        Backup Solutions
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Explore Storage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Featured Products</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Popular Solutions</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Discover our most popular products chosen by thousands of customers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Featured GPU */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center">
                      <Gpu className="h-5 w-5 text-purple-400" />
                    </div>
                    <Badge className="gradient-purple-blue text-white border-0">Popular</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-1">NVIDIA RTX 4090</h3>
                  <p className="text-sm text-slate-400 mb-2">High-performance GPU for AI and rendering</p>
                  <p className="text-xl font-bold text-purple-400">$1.20/hr</p>
                </CardContent>
                <CardFooter>
                  <Link href="/buy/gpu" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Featured Web Hosting */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-400" />
                    </div>
                    <Badge className="bg-green-600 text-white border-0">Best Value</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-1">Web Hosting Pro</h3>
                  <p className="text-sm text-slate-400 mb-2">Reliable hosting for websites and applications</p>
                  <p className="text-xl font-bold text-purple-400">$9.99/mo</p>
                </CardContent>
                <CardFooter>
                  <Link href="/buy/hosting" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Featured Discord Bot */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-indigo-500/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-1">Discord Bot Hosting</h3>
                  <p className="text-sm text-slate-400 mb-2">24/7 uptime for your Discord bots</p>
                  <p className="text-xl font-bold text-purple-400">$5.99/mo</p>
                </CardContent>
                <CardFooter>
                  <Link href="/buy/hosting" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Featured Storage */}
              <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 rounded-md bg-green-500/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-bold text-white mb-1">Cloud Storage</h3>
                  <p className="text-sm text-slate-400 mb-2">Secure and scalable storage solutions</p>
                  <p className="text-xl font-bold text-purple-400">$0.02/GB</p>
                </CardContent>
                <CardFooter>
                  <Link href="/buy/cloudstorage" className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Get Started</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                Ready to power your digital presence?
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Choose the solution that fits your needs and deploy in minutes. No long-term commitments required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/pricing">
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    View All Products
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
