import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronLeft, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GlowEffect } from "@/components/glow-effect"
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/mdx"
import { BlogCard } from "@/components/blog/blog-card"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found - Nylon Hosting",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - Nylon Hosting Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()

  // Find previous and next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  // Get related posts (same category or tags)
  const relatedPosts = allPosts
    .filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags?.some((tag) => post.tags?.includes(tag))),
    )
    .slice(0, 3)

  // Render the markdown content to HTML
  const contentHtml = renderMarkdown(post.content)

  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4 pl-0">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted overflow-hidden">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>
          </div>

          {post.image && (
            <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-xl">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <Card className="prose prose-lg dark:prose-invert mx-auto max-w-none p-6 md:p-10">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Card>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`}>
                    <span className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-primary/10 hover:text-primary">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`}>
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Post
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`}>
                <Button variant="outline">
                  Next Post
                  <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            )}
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
