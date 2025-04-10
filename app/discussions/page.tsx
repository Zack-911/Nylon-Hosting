import type { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, PlusCircle, Search, Users, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Discussions - Nylon Hosting",
  description: "Join the Nylon Hosting community discussions",
}

export default function DiscussionsPage() {
  const categories = [
    { name: "General", count: 124, icon: MessageSquare },
    { name: "VPS Hosting", count: 86, icon: Server },
    { name: "Dedicated Servers", count: 53, icon: Server },
    { name: "Technical Support", count: 97, icon: MessageSquare },
    { name: "Tutorials", count: 42, icon: MessageSquare },
    { name: "Feature Requests", count: 31, icon: MessageSquare },
  ]

  const recentTopics = [
    {
      title: "Best practices for securing a VPS",
      author: "JaneDoe",
      replies: 24,
      views: 342,
      category: "VPS Hosting",
      lastActivity: "2 hours ago",
    },
    {
      title: "How to optimize MySQL performance",
      author: "TechGuru",
      replies: 18,
      views: 256,
      category: "Technical Support",
      lastActivity: "5 hours ago",
    },
    {
      title: "Setting up Nginx as a reverse proxy",
      author: "ServerPro",
      replies: 32,
      views: 487,
      category: "Tutorials",
      lastActivity: "1 day ago",
    },
    {
      title: "Docker container management tips",
      author: "ContainerFan",
      replies: 15,
      views: 198,
      category: "VPS Hosting",
      lastActivity: "2 days ago",
    },
    {
      title: "Dedicated server vs. cloud hosting",
      author: "CloudExpert",
      replies: 27,
      views: 312,
      category: "Dedicated Servers",
      lastActivity: "3 days ago",
    },
  ]

  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Discussions</h1>
            <p className="text-muted-foreground">Join the conversation with other Nylon Hosting users</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Topic
          </Button>
        </div>

        <div className="panel-layout">
          {/* Left panel - Categories */}
          <div className="space-y-6">
            <Card className="panel-gradient">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <button key={index} className="w-full p-3 text-left hover:bg-accent/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <category.icon className="h-5 w-5 text-primary" />
                          <span>{category.name}</span>
                        </div>
                        <span className="rounded-full bg-accent px-2 py-1 text-xs">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="panel-gradient">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-medium"
                      >
                        U{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">+15 more online</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">1,248 registered members</span>
                </div>
              </CardContent>
            </Card>

            <Card className="panel-gradient">
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search discussions..." className="pl-8" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      VPS
                    </Button>
                    <Button variant="outline" size="sm">
                      Security
                    </Button>
                    <Button variant="outline" size="sm">
                      Docker
                    </Button>
                    <Button variant="outline" size="sm">
                      Nginx
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content panel */}
          <div className="space-y-6">
            <Card className="panel-gradient">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Discussions</CardTitle>
                    <CardDescription>Join the conversation in our community forums</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Latest
                    </Button>
                    <Button variant="outline" size="sm">
                      Popular
                    </Button>
                    <Button variant="outline" size="sm">
                      Unanswered
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 rounded-lg border border-accent p-4 transition-colors hover:bg-accent/30 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-medium hover:text-primary">
                          <Link href="#">{topic.title}</Link>
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>By {topic.author}</span>
                          <span>in {topic.category}</span>
                          <span>Last activity: {topic.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          <span>{topic.replies}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{topic.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="panel-gradient">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-accent p-4">
                    <h3 className="font-medium text-primary">
                      Weekly Discussion: What&apos;s your favorite Linux distro for servers?
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Join our weekly discussion about server operating systems. Share your experiences and learn from
                      others.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Started by Admin</span>
                        <span>•</span>
                        <span>42 replies</span>
                      </div>
                      <Button size="sm">Join Discussion</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-accent p-4">
                    <h3 className="font-medium text-primary">Announcement: New server locations available!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We&apos;ve added new server locations in Asia and Australia. Check out the announcement for more
                      details.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Official Announcement</span>
                        <span>•</span>
                        <span>15 replies</span>
                      </div>
                      <Button size="sm">Read More</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
