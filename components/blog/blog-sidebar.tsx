import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Category {
  name: string
  count: number
}

interface BlogSidebarProps {
  categories: Category[]
  tags?: string[]
}

export function BlogSidebar({ categories, tags = [] }: BlogSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search articles..." />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <Link
                  href={`/blog/category/${category.name.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {category.name}
                </Link>
                <span className="rounded-full bg-muted px-2 py-1 text-xs">{category.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {tags && tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`}>
                  <span className="rounded-full bg-muted px-3 py-1 text-sm hover:bg-primary/10 hover:text-primary">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Subscribe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">Get the latest articles and news delivered to your inbox.</p>
          <div className="space-y-2">
            <Input placeholder="Your email address" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
