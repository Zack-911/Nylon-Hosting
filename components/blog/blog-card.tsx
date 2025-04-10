import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/mdx"

interface BlogCardProps {
  post: Post
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (!post) {
    return null // Return null if post is undefined
  }

  return (
    <Card
      className={`overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-md ${featured ? "md:grid md:grid-cols-2" : ""}`}
    >
      <div className={`relative ${featured ? "order-2 md:order-1 h-64 md:h-full" : "h-48"} w-full`}>
        <Image
          src={post.image || "/placeholder.svg?height=400&width=800"}
          alt={post.title || "Blog post"}
          fill
          className={`object-cover ${!featured && "rounded-t-lg"}`}
        />
      </div>
      <div className={featured ? "order-1 md:order-2" : ""}>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {post.category || "Uncategorized"}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date || new Date()).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime || "5 min read"}</span>
            </div>
          </div>
          <CardTitle className={`${featured ? "text-2xl md:text-3xl" : "text-xl"} line-clamp-2`}>
            {post.title || "Untitled Post"}
          </CardTitle>
          <CardDescription className="line-clamp-2">{post.excerpt || "No excerpt available"}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted overflow-hidden">
              {post.author?.avatar ? (
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name || "Author"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>
            <span className="text-sm font-medium">{post.author?.name || "Anonymous"}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/blog/${post.slug}`}>
            <Button variant="ghost" size="sm">
              Read More
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}
