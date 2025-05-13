"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, CpuIcon as Gpu, Globe, ChevronRight, Bot, Rocket, Database } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiceCard from "@/components/service-card"
import EnhancedHero from "@/components/enhanced/EnhancedHero"
import EnhancedCard from "@/components/enhanced/EnhancedCard"
import styles from "@/styles/modules/animations.module.css"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <EnhancedHero
          title="Power Your Digital Presence"
          description="From websites and applications to Discord bots and GPU computing — host everything you need on our high-performance infrastructure."
        />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Powerful Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Everything you need for digital success
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a comprehensive suite of tools and services for all your hosting needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <EnhancedCard
                title="Website Hosting"
                description="Fast, reliable hosting for static sites and dynamic web applications."
                icon={Globe}
                iconColor="text-blue-500"
                content={
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                      Static sites, Next.js, React apps
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                      Global CDN with edge caching
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                      Custom domains & SSL certificates
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                      Berk&apos;s Femboy Pics
                    </li>
                  </ul>
                }
              />
              <EnhancedCard
                title="Discord Bot Hosting"
                description="Reliable hosting for your Discord bots with 24/7 uptime."
                icon={Bot}
                iconColor="text-indigo-500"
                content={
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                      Support for Discord.js, Python, and more
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                      Automatic restarts and monitoring
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                      Scalable resources as your bot grows
                    </li>
                  </ul>
                }
              />
            </div>
          </div>
        </section>

        {/* Hosting Services Section */}
        <section id="hosting" className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Hosting Solutions</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Host anything, anywhere
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From simple static websites to complex applications, we&apos;ve got you covered with our comprehensive
                  hosting solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Globe className={`h-10 w-10 text-blue-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Static Website Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      Fast and reliable hosting for static websites with global CDN.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        HTML, CSS, JavaScript sites
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Global CDN with edge caching
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Custom domains & SSL certificates
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Continuous deployment from Git
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Start Hosting</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Rocket className={`h-10 w-10 text-purple-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Full-Stack App Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      Deploy full-stack applications with backend and database support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Next.js, React, Vue, Angular apps
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Node.js, Python, Go backends
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Database integrations (PostgreSQL, MongoDB)
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Serverless functions & API routes
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Deploy App</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Bot className={`h-10 w-10 text-indigo-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Discord Bot Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      Reliable 24/7 hosting for your Discord bots.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                        Discord.js, Python, JDA bots
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                        Automatic restarts & monitoring
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                        Logs & performance metrics
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-indigo-500 mr-1 mt-0.5" />
                        Scalable resources as your bot grows
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Host Bot</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Database className={`h-10 w-10 text-green-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Database Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      Managed database solutions for your applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        PostgreSQL, MySQL, MongoDB
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        Automatic backups & point-in-time recovery
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        High availability & replication
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        Secure connection & encryption
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Deploy Database</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Server className={`h-10 w-10 text-yellow-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">VPS Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      Virtual private servers with full root access.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                        Linux & Windows servers
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                        Full root access & SSH
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                        Dedicated CPU & RAM resources
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                        SSD storage & high bandwidth
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Get VPS</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Gpu className={`h-10 w-10 text-purple-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">GPU Hosting</CardTitle>
                    <CardDescription className="text-slate-400">
                      High-performance GPU resources for compute-intensive tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300 grow">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Latest NVIDIA & AMD GPUs
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        AI/ML frameworks pre-installed
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Multi-GPU configurations
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Pay-as-you-go pricing
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Rent GPU</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Flexible Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Choose the perfect plan for your needs
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you&apos;re a hobbyist, small business, or enterprise, we have pricing options that scale with
                  your requirements.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div>
                <ServiceCard
                  title="Starter"
                  description="For individuals and small projects"
                  icon={Rocket}
                  iconColor="text-blue-500"
                  price="$9"
                  features={[
                    "1 Website or Discord Bot",
                    "10GB SSD Storage",
                    "100GB Bandwidth",
                    "Free SSL Certificate",
                    "24/7 Uptime Monitoring",
                    "Community Support",
                  ]}
                />
              </div>
              <div>
                <ServiceCard
                  title="Professional"
                  description="For growing businesses and teams"
                  icon={Server}
                  iconColor="text-purple-500"
                  price="$29"
                  popular={true}
                  features={[
                    "5 Websites or Discord Bots",
                    "50GB SSD Storage",
                    "500GB Bandwidth",
                    "Free SSL Certificates",
                    "24/7 Uptime Monitoring",
                    "Priority Support",
                    "Custom Domains",
                    "Database Included",
                  ]}
                />
              </div>
              <div>
                <ServiceCard
                  title="Enterprise"
                  description="For organizations with advanced needs"
                  icon={Gpu}
                  iconColor="text-yellow-500"
                  price="Custom"
                  period=""
                  ctaText="Contact Sales"
                  features={[
                    "Unlimited Websites & Bots",
                    "Custom Storage Solutions",
                    "Unlimited Bandwidth",
                    "Free SSL Certificates",
                    "24/7 Uptime Monitoring",
                    "Dedicated Support",
                    "Custom Domains",
                    "Advanced Database Options",
                    "GPU Access",
                    "Custom SLAs",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
