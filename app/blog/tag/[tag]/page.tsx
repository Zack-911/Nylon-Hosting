import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/glow-effect"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllPosts } from "@/lib/mdx"

interface TagPageProps {
  params: {
    tag: string
  }
  searchParams: { page?: string }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `#${tag.charAt(0).toUpperCase() + tag.slice(1)} - Nylon Hosting Blog`,
    description: `Browse all articles tagged with #${tag}`,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || []).map((tag) => tag.toLowerCase())))

  return tags.map((tag) => ({
    tag,
  }))
}

// Number of posts per page
const POSTS_PER_PAGE = 6

export default async function TagPage({ params, searchParams }: TagPageProps) {
  // Get current page from query params or default to 1
  const currentPage = Number(searchParams.page) || 1

  // Get tag from params
  const tag = decodeURIComponent(params.tag)

  // Fetch all posts
  const allPosts = await getAllPosts()

  // Filter posts by tag
  const tagPosts = allPosts.filter((post) => post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()))

  // Calculate pagination
  const totalPosts = tagPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // Get posts for current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = tagPosts.slice(startIndex, endIndex)

  // Extract categories from all posts
  const categoriesMap = allPosts.reduce(
    (acc, post) => {
      const category = post.category || "Uncategorized"
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = Object.entries(categoriesMap).map(([name, count]) => ({ name, count }))

  // Extract unique tags from all posts
  const allTags = allPosts.flatMap((post) => post.tags || [])
  const uniqueTags = Array.from(new Set(allTags)).slice(0, 10) // Get top 10 tags

  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4 pl-0">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            #{tag.charAt(0).toUpperCase() + tag.slice(1)}
          </h1>
          <p className="text-muted-foreground">Browse all articles tagged with #{tag}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {currentPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {currentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <h2 className="text-xl font-medium">No posts found</h2>
                <p className="mt-2 text-muted-foreground">
                  There are no posts with this tag yet. Check back later for new content.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {currentPage > 1 && (
                  <Link href={`/blog/tag/${tag}?page=${currentPage - 1}`}>
                    <Button variant="outline">Previous</Button>
                  </Link>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link key={page} href={`/blog/tag/${tag}?page=${page}`}>
                      <Button variant={currentPage === page ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">
                        {page}
                      </Button>
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <Link href={`/blog/tag/${tag}?page=${currentPage + 1}`}>
                    <Button variant="outline">Next</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
          <div>
            <BlogSidebar categories={categories} tags={uniqueTags} />
          </div>
        </div>
      </div>
    </div>
  )
}
