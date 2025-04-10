import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"

export const metadata: Metadata = {
  title: "Community - Nylon Hosting",
  description: "Join the Nylon Hosting community and connect with other users",
}

export default function CommunityPage() {
  const communityFeatures = [
    {
      title: "Discussion Forums",
      description: "Connect with other users, share ideas, and get help with your hosting setup.",
      icon: MessageSquare,
    },
    {
      title: "User Groups",
      description: "Join specialized groups based on your interests, technologies, or business needs.",
      icon: Users,
    },
    {
      title: "Knowledge Base",
      description: "Access our extensive library of tutorials, guides, and best practices.",
      icon: "document",
    },
  ]

  const recentDiscussions = [
    {
      title: "Best practices for securing a VPS",
      author: "JaneDoe",
      replies: 24,
      views: 342,
      category: "Security",
    },
    {
      title: "How to optimize MySQL performance",
      author: "TechGuru",
      replies: 18,
      views: 256,
      category: "Databases",
    },
    {
      title: "Setting up Nginx as a reverse proxy",
      author: "ServerPro",
      replies: 32,
      views: 487,
      category: "Web Servers",
    },
    {
      title: "Docker container management tips",
      author: "ContainerFan",
      replies: 15,
      views: 198,
      category: "Containers",
    },
  ]

  const upcomingEvents = [
    {
      title: "Webinar: Cloud Migration Strategies",
      date: "May 15, 2025",
      time: "2:00 PM EST",
      attendees: 156,
    },
    {
      title: "Workshop: Kubernetes for Beginners",
      date: "May 22, 2025",
      time: "1:00 PM EST",
      attendees: 89,
    },
    {
      title: "Q&A Session: Ask Our Experts",
      date: "May 30, 2025",
      time: "3:00 PM EST",
      attendees: 112,
    },
  ]

  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Join Our Community</h1>
          <p className="mt-4 text-muted-foreground">
            Connect with other Nylon Hosting users, share knowledge, and get help from our community of experts.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg">Join Now</Button>
            <Button size="lg" variant="outline">
              Browse Forums
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {communityFeatures.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {feature.icon === "document" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  ) : (
                    <feature.icon className="h-6 w-6 text-primary" />
                  )}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Discussions</CardTitle>
                <CardDescription>Join the conversation in our community forums</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiscussions.map((discussion, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-medium hover:text-primary">
                          <Link href="#">{discussion.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Posted by {discussion.author} in {discussion.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Discussions
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Join our webinars and workshops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                      <h3 className="font-medium hover:text-primary">
                        <Link href="#">{event.title}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                      <p className="mt-2 text-sm">
                        <span className="text-primary">{event.attendees}</span> people attending
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-16 rounded-lg border bg-muted/40 p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to join our community?</h2>
          <p className="mt-2 text-muted-foreground">
            Connect with thousands of users and experts to learn, share, and grow together.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg">Create Account</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
