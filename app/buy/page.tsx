"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ServerIcon, ArrowRight, HardDrive, Database, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import styles from "@/styles/modules/animations.module.css"
import ScrollReveal from "@/components/ScrollReveal"
import { motion } from "framer-motion"

export default function BuyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-0"
          />

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  Nylon Hosting Service Marketplace
                </Badge>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find the Perfect Solution
              </motion.h1>

              <motion.p
                className="text-xl text-slate-400 max-w-[700px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our range of high-performance computing resources, hosting solutions, and storage options.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                  Our Product Categories
                </h2>
                <p className="text-lg text-slate-400 max-w-[700px]">
                  Choose from our wide range of services designed to meet your specific needs.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Dedicated Servers */}
              <ScrollReveal delay={0.1} direction="up">
                <Link href="/buy/dedicated-servers" className="block">
                  <Card className={`bg-[var(--bg-card)] border-slate-800 h-full ${styles.cardHover}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src="/placeholder.svg?height=300&width=600"
                        alt="Dedicated Servers"
                        width={600}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-bold text-white">Dedicated Servers</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 text-slate-300 flex-grow">
                      <p>
                        High-performance physical servers with full control, ideal for resource-intensive applications.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          Enterprise-grade Hardware
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          Full Root Access
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          Customizable Configurations
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full gradient-purple-blue gradient-purple-blue-hover ${styles.buttonHover}`}
                      >
                        Explore Dedicated Servers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </ScrollReveal>

              {/* VPS */}
              <ScrollReveal delay={0.2} direction="up">
                <Link href="/buy/vps" className="block">
                  <Card className={`bg-[var(--bg-card)] border-slate-800 h-full ${styles.cardHover}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src="/placeholder.svg?height=300&width=600"
                        alt="Virtual Private Servers"
                        width={600}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-bold text-white">Virtual Private Servers</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 text-slate-300 flex-grow">
                      <p>
                        Virtualized servers with dedicated resources, offering the perfect balance of performance and
                        cost.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          Scalable Resources
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          Multiple OS Options
                        </Badge>
                        <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                          SSD Storage
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full gradient-purple-blue gradient-purple-blue-hover ${styles.buttonHover}`}
                      >
                        Explore VPS
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </ScrollReveal>

              {/* Cloud Storage */}
              <ScrollReveal delay={0.3} direction="up">
                <Link href="/buy/cloudstorage" className="block">
                  <Card className={`bg-[var(--bg-card)] border-slate-800 h-full ${styles.cardHover}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src="/placeholder.svg?height=300&width=600"
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
                      <p>
                        Secure, scalable cloud storage solutions for your data with high-speed access and redundancy.
                      </p>
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
                      <Button
                        className={`w-full gradient-purple-blue gradient-purple-blue-hover ${styles.buttonHover}`}
                      >
                        Explore Storage
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Featured Products</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Popular Solutions</h2>
                <p className="text-lg text-slate-400 max-w-[700px]">
                  Discover our most popular products chosen by thousands of customers.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Featured Dedicated Server */}
              <ScrollReveal delay={0.1} direction="up">
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div
                        className={`h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center ${styles.pulseAnimation}`}
                      >
                        <ServerIcon className="h-5 w-5 text-purple-400" />
                      </div>
                      <Badge className="gradient-purple-blue text-white border-0">Popular</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-bold text-white mb-1">Enterprise Server</h3>
                    <p className="text-sm text-slate-400 mb-2">Dual Xeon, 128GB RAM, 2TB NVMe</p>
                    <p className="text-xl font-bold text-purple-400">$299.99/mo</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/buy/dedicated-servers" className="w-full">
                      <Button className={`w-full ${styles.buttonHover}`} variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              {/* Featured VPS */}
              <ScrollReveal delay={0.2} direction="up">
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div
                        className={`h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center ${styles.pulseAnimation}`}
                      >
                        <Globe className="h-5 w-5 text-blue-400" />
                      </div>
                      <Badge className="bg-green-600 text-white border-0">Best Value</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-bold text-white mb-1">Business VPS</h3>
                    <p className="text-sm text-slate-400 mb-2">4 vCPU, 8GB RAM, 100GB SSD</p>
                    <p className="text-xl font-bold text-purple-400">$29.99/mo</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/buy/vps" className="w-full">
                      <Button className={`w-full ${styles.buttonHover}`} variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              {/* Featured Web Hosting */}
              <ScrollReveal delay={0.3} direction="up">
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div
                        className={`h-10 w-10 rounded-md bg-indigo-500/10 flex items-center justify-center ${styles.pulseAnimation}`}
                      >
                        <HardDrive className="h-5 w-5 text-indigo-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-bold text-white mb-1">Dedicated SSD</h3>
                    <p className="text-sm text-slate-400 mb-2">1TB NVMe with 3000 IOPS</p>
                    <p className="text-xl font-bold text-purple-400">$79.99/mo</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/buy/dedicated-servers" className="w-full">
                      <Button className={`w-full ${styles.buttonHover}`} variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              {/* Featured Storage */}
              <ScrollReveal delay={0.4} direction="up">
                <Card className={`bg-[var(--bg-card)] border-slate-800 ${styles.cardHover}`}>
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-start">
                      <div
                        className={`h-10 w-10 rounded-md bg-green-500/10 flex items-center justify-center ${styles.pulseAnimation}`}
                      >
                        <Database className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="text-lg font-bold text-white mb-1">Object Storage</h3>
                    <p className="text-sm text-slate-400 mb-2">Scalable storage with global CDN</p>
                    <p className="text-xl font-bold text-purple-400">$0.015/GB</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/buy/cloudstorage" className="w-full">
                      <Button className={`w-full ${styles.buttonHover}`} variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <ScrollReveal direction="up">
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
                    <Button
                      size="lg"
                      className={`gradient-purple-blue gradient-purple-blue-hover ${styles.buttonHover}`}
                    >
                      View All Products
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button
                      size="lg"
                      variant="outline"
                      className={`border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white ${styles.buttonHover}`}
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
