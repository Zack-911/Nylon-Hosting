import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/glow-effect"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { getAllPosts } from "@/lib/mdx"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: { page?: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.category)

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Nylon Hosting Blog`,
    description: `Browse all articles in the ${category} category`,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = Array.from(new Set(posts.map((post) => post.category.toLowerCase())))

  return categories.map((category) => ({
    category,
  }))
}

// Number of posts per page
const POSTS_PER_PAGE = 6

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  // Get current page from query params or default to 1
  const currentPage = Number(searchParams.page) || 1

  // Get category from params
  const category = decodeURIComponent(params.category)

  // Fetch all posts
  const allPosts = await getAllPosts()

  // Filter posts by category
  const categoryPosts = allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())

  // Calculate pagination
  const totalPosts = categoryPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // Get posts for current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = categoryPosts.slice(startIndex, endIndex)

  // Extract categories from all posts
  const categoriesMap = allPosts.reduce(
    (acc, post) => {
      const cat = post.category || "Uncategorized"
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = Object.entries(categoriesMap).map(([name, count]) => ({ name, count }))

  // Extract unique tags from category posts
  const categoryTags = categoryPosts.flatMap((post) => post.tags || [])
  const uniqueTags = Array.from(new Set(categoryTags)).slice(0, 10) // Get top 10 tags

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

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl capitalize">{category}</h1>
          <p className="text-muted-foreground">Browse all articles in the {category} category</p>
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
                  There are no posts in this category yet. Check back later for new content.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {currentPage > 1 && (
                  <Link href={`/blog/category/${category}?page=${currentPage - 1}`}>
                    <Button variant="outline">Previous</Button>
                  </Link>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link key={page} href={`/blog/category/${category}?page=${page}`}>
                      <Button variant={currentPage === page ? "default" : "outline"} size="sm" className="w-8 h-8 p-0">
                        {page}
                      </Button>
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <Link href={`/blog/category/${category}?page=${currentPage + 1}`}>
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
