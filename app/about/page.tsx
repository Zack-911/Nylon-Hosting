import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Rocket, Target, Heart, Zap, Shield, Mail, MapPin, Phone } from "lucide-react"
import { FaGithub, FaDiscord } from "react-icons/fa"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Team members data
const teamMembers = [
  {
    name: "Koomball",
    role: "CEO & Founder",
    bio: "CEO & Founder of Nylon Developments, Currently starting Nylon Hosting Services (NHS) & The Nylon Design Studio.",
    image: "/team/koomball.png?height=400&width=400",
    github: "https://github.com/Koomball",
    discord: "https://discord.com/users/1095378481237475409",
  },
  {
    name: "Μοχάμεντ",
    role: "FrontEnd Developer",
    bio: "Berk Likes Femboys",
    image: "/team/zack.png?height=400&width=400",
    github: "https://github.com/zack-911",
    discord: "https://discord.com/users/1273256222715285527",
  },
]

// Partners data
const partners = [
  {
    name: "NVIDIA",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Balls",
  },
]

// Timeline events
const timelineEvents = [
  {
    year: "2022",
    title: "Company Founded",
    description:
      "Nylon was founded by Roxette Menzy Dylarno with a mission to simplify access to GPU computing, Crypto Mining & Hosting Services.",
  },
  {
    year: "2024",
    title: "Seed Funding",
    description: "Raised $5M in seed funding to build the initial platform and infrastructure.",
  },
  {
    year: "2025",
    title: "Beta Launch",
    description: "Launched our beta platform with support for NVIDIA RTX 3090 and A100 GPUs.",
  },
  {
    year: "2025",
    title: "Series A Funding",
    description: "Secured $25M in Series A funding to expand our infrastructure and team.",
  },
  {
    year: "2026",
    title: "Public Launch",
    description:
      "Officially launched the Nylon Hosting Service platform to the public with support for a wide range of GPU models.",
  },
  {
    year: "2026",
    title: "Enterprise Offering",
    description:
      "Introduced Nylon Hosting Service Enterprise with dedicated infrastructure and advanced security features.",
  },
  {
    year: "2026",
    title: "International Expansion",
    description: "Expanded our infrastructure to Europe and Asia to provide lower latency for global customers.",
  },
  {
    year: "2027",
    title: "Series B Funding",
    description: "Raised $80M in Series B funding to accelerate growth and product development.",
  },
  {
    year: "2027",
    title: "H100 Support",
    description:
      "Added support for NVIDIA H100 GPUs, making us one of the first cloud providers to offer these cutting-edge GPUs.",
  },
  {
    year: "2027",
    title: "1 Million Users",
    description: "Reached the milestone of 1 million registered users on the platform.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[var(--bg-dark)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/10 to-blue-900/10 opacity-30"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-2">
                    About Nylon Hosting Service
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-text">
                    Powering the Future of GPU Computing
                  </h1>
                  <p className="max-w-[600px] text-slate-400 md:text-xl">
                    We&apos;re on a mission to democratize access to high-performance GPU computing for developers,
                    researchers, and businesses worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                    Join Our Team
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    Learn Our Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card className="bg-[var(--bg-card)] border-slate-800" data-aos="fade-up" aos-delay="10">
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-purple-500/10 flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-lg">
                    To democratize access to high-performance GPU computing by providing a reliable, scalable, and
                    cost-effective platform that empowers developers, researchers, and businesses to build the future.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[var(--bg-card)] border-slate-800" data-aos="fade-up" aos-delay="10">
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-purple-500/10 flex items-center justify-center mb-2">
                    <Rocket className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-lg">
                    A world where computational resources are no longer a barrier to innovation, where anyone with an
                    idea can access the computing power they need to bring that idea to life, and where AI and other
                    GPU-accelerated technologies can reach their full potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20" data-aos="fade-right">
                Our Values
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text" data-aos="fade-right">
                What We Stand For
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]" data-aos="fade-right">
                Our core values guide everything we do, from how we build our products to how we interact with our
                customers and each other.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Zap,
                  title: "Innovation",
                  description:
                    "We constantly push the boundaries of what's possible in GPU computing, always looking for new ways to improve our platform and provide more value to our customers.",
                },
                {
                  icon: Shield,
                  title: "Reliability",
                  description:
                    "We build robust, resilient systems that our customers can depend on for their most critical workloads, with a focus on uptime, performance, and security.",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "We believe in the power of community and actively contribute to open source projects, share knowledge, and foster collaboration among our users.",
                },
                {
                  icon: Heart,
                  title: "Accessibility",
                  description:
                    "We're committed to making high-performance computing accessible to everyone, regardless of their background, location, or resources.",
                },
              ].map((value, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800" data-aos="fade-up">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-md bg-purple-500/10 flex items-center justify-center mb-2">
                      <value.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20" data-aos="fade-left">
                Our Team
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text" data-aos="fade-left">
                Meet the People Behind Nylon Hosting Service
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]" data-aos="fade-left">
                We&apos;re a diverse team of engineers, product managers, designers, and customer success specialists
                united by our passion for GPU computing and helping our customers succeed.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-down">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800 overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{member.name}</CardTitle>
                    <CardDescription className="text-purple-400">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-start space-x-2">
                    <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <span className="h-5 w-5">
                          <FaGithub size={20} />
                        </span>
                      </a>
                    </Button>

                    <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <a href={member.discord} target="_blank" rel="noopener noreferrer">
                        <span className="h-5 w-5">
                          <FaDiscord size={20} />
                        </span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company History Timeline */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Our Journey</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Company History</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                From a small startup to a leading GPU cloud provider, here&apos;s how our journey has unfolded.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-700"></div>

              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-between`}
                  >
                    <div
                      className={`hidden md:block ${index % 2 === 0 ? "order-2 md:pl-12" : "order-1 md:pr-12"} w-1/2`}
                    >
                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <Badge className="inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-1 w-fit">
                            {event.year}
                          </Badge>
                          <CardTitle className="text-white">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500"></div>

                    {/* Mobile view */}
                    <div className="md:hidden w-full pl-8">
                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <Badge className="inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-1 w-fit">
                            {event.year}
                          </Badge>
                          <CardTitle className="text-white">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div
                      className={`hidden md:block ${index % 2 === 0 ? "order-1 md:pr-12 text-right" : "order-2 md:pl-12"} w-1/2`}
                    >
                      {index % 2 !== 0 && (
                        <Card className="bg-[var(--bg-card)] border-slate-800">
                          <CardHeader>
                            <Badge className="inline-flex bg-purple-500/10 text-purple-400 border-purple-500/20 mb-1 w-fit">
                              {event.year}
                            </Badge>
                            <CardTitle className="text-white">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-300">{event.description}</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20" data-aos="fade-right">
                Our Partners
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text" data-aos="fade-right">
                Strategic Partnerships
              </h2>
              <p className="text-lg text-slate-400 max-w-[700px]" data-aos="fade-right">
                We collaborate with industry leaders to provide the best possible experience for our customers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
              {partners.map((partner, index) => (
                <Card key={index} className="bg-[var(--bg-card)] border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="h-20 flex items-center justify-center">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          width={200}
                          height={80}
                          className="max-h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-medium text-white">{partner.name}</h3>
                      <p className="text-slate-300">{partner.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Get In Touch</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Contact Us</h2>
                <p className="text-lg text-slate-400">
                  Have questions about our company, products, or career opportunities? We&apos;d love to hear from you.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Headquarters</h3>
                      <p className="text-slate-400">
                        123 Tech Plaza, Suite 400
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Email</h3>
                      <p className="text-slate-400">
                        info@Nylon Hosting Service.com
                        <br />
                        support@Nylon Hosting Service.com
                        <br />
                        careers@Nylon Hosting Service.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Phone</h3>
                      <p className="text-slate-400">
                        +1 (555) 123-4567
                        <br />
                        Mon-Fri: 9:00 AM - 6:00 PM PT
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Global Offices</h3>
                      <p className="text-slate-400">London • Berlin • Singapore • Tokyo</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    temp
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    temp
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    temp
                  </Button>
                </div>
              </div>

              <div className="glow-effect">
                <Card className="bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Send us a message</CardTitle>
                    <CardDescription className="text-slate-400">
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm text-slate-300">
                            First name
                          </label>
                          <input
                            id="first-name"
                            className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm text-slate-300">
                            Last name
                          </label>
                          <input
                            id="last-name"
                            className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-slate-300">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm text-slate-300">
                          Subject
                        </label>
                        <input
                          id="subject"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm text-slate-300">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="w-full rounded-md border border-slate-700 bg-[var(--bg-card)] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                          placeholder="Tell us about your inquiry..."
                        />
                      </div>
                      <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Join Our Team</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">We&apos;re Hiring!</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Join our team of passionate individuals working to democratize access to high-performance GPU computing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="gradient-purple-blue gradient-purple-blue-hover">
                  View Open Positions
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Learn About Our Culture
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

