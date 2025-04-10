import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Define the blog post directory
const postsDirectory = path.join(process.cwd(), "content/blog")

// Define the Post type
export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  image?: string
  tags?: string[]
  featured?: boolean
}

// Generate a slug from a string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .trim() // Remove leading/trailing spaces
}

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    // Check if the directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Blog posts directory does not exist:", postsDirectory)
    }

    // Get all files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, "")

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents)

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/g).length
        const readingTime = `${Math.ceil(wordCount / 200)} min read`

        // Ensure all required fields are present
        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          content,
          readingTime,
          author: data.author || { name: "Anonymous" },
          category: data.category || "Uncategorized",
          image: data.image || null,
          tags: data.tags || [],
          featured: data.featured || false,
        }
      })

    // Sort posts by date
    return allPostsData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
  } catch (error) {
    console.error("Error getting all posts:", error)
  }

  // Return an empty array if an error occurs
  return []
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Calculate reading time
    const wordCount = content.split(/\s+/g).length
    const readingTime = `${Math.ceil(wordCount / 200)} min read`

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      content,
      readingTime,
      author: data.author || { name: "Anonymous" },
      category: data.category || "Uncategorized",
      image: data.image || null,
      tags: data.tags || [],
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    // Try to find a mock post with the same slug
    return null
  }
}

// Simple markdown to HTML conversion for mock data
export function renderMarkdown(markdown: string): string {
  // This is a very basic markdown to HTML converter
  // Replace headers
  const html = markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
    .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
    .replace(/^###### (.*$)/gm, "<h6>$1</h6>")

    // Replace bold and italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Replace links
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')

    // Replace lists
    .replace(/^\* (.*$)/gm, "<li>$1</li>")
    .replace(/^- (.*$)/gm, "<li>$1</li>")

    // Replace paragraphs
    .replace(/^(?!<[a-z])(.*$)/gm, "<p>$1</p>")

    // Replace line breaks
    .replace(/\n/g, "")

  return html
}