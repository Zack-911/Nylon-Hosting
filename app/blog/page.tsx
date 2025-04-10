import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/glow-effect"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "Blog - Nylon Hosting",
  description: "Latest news, tutorials, and insights from Nylon Hosting",
}

// Number of posts per page
const POSTS_PER_PAGE = 6

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  // Get current page from query params or default to 1
  const currentPage = Number(searchParams.page) || 1

  // Fetch all posts
  const allPosts = await getAllPosts()

  // Check if we have any posts
  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="relative">
        <GlowEffect />
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
              <p className="text-muted-foreground">Latest news, tutorials, and insights from Nylon Hosting</p>
            </div>
          </div>
          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-xl font-medium">No posts found</h2>
            <p className="mt-2 text-muted-foreground">Check back later for new content.</p>
          </div>
        </div>
      </div>
    )
  }

  // Find featured post (first post marked as featured or first post)
  const featuredPost = allPosts.find((post) => post.featured) || allPosts[0]

  // Remove featured post from the list
  const remainingPosts = allPosts.filter((post) => post.slug !== featuredPost.slug)

  // Calculate pagination
  const totalPosts = remainingPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // Get posts for current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = remainingPosts.slice(startIndex, endIndex)

  // Extract categories from posts
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
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
            <p className="text-muted-foreground">Latest news, tutorials, and insights from Nylon Hosting</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/blog/archive">
              <Button variant="outline">All Posts</Button>
            </Link>
            <Link href="/blog/categories">
              <Button variant="outline">Categories</Button>
            </Link>
            <Button>Subscribe</Button>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-6 text-2xl font-bold">Recent Articles</h2>
            {currentPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {currentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <h2 className="text-xl font-medium">No more posts</h2>
                <p className="mt-2 text-muted-foreground">
                  There are no more posts to display. Check back later for new content.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {currentPage > 1 && (
                  <Link href={`/blog?page=${currentPage - 1}`}>
                    <Button variant="outline">Previous</Button>
                  </Link>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link key={page} href={`/blog?page=${page}`}>
                      <Button variant={currentPage === page ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">
                        {page}
                      </Button>
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    <Button variant="outline">Next</Button>
                  </Link>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Link href="/blog/archive">
                <Button variant="outline">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <BlogSidebar categories={categories} tags={uniqueTags} />
          </div>
        </div>
      </div>
    </div>
  )
}
