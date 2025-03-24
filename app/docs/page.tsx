import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CpuIcon as Gpu, Search, BookOpen, Code, Terminal, FileText, Rocket, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Documentation categories
const docCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of Nylon Hosting Service and deploy your first GPU instance",
    icon: Rocket,
    articles: [
      { id: "introduction", title: "Introduction to Nylon Hosting Service", readTime: "3 min read" },
      { id: "account-setup", title: "Setting up your account", readTime: "5 min read" },
      { id: "first-instance", title: "Deploying your first GPU instance", readTime: "7 min read" },
      { id: "billing-basics", title: "Understanding billing and pricing", readTime: "4 min read" },
      { id: "ssh-access", title: "Accessing your instance via SSH", readTime: "6 min read" },
    ],
  },
  {
    id: "gpu-instances",
    title: "GPU Instances",
    description: "Detailed information about our GPU offerings and configurations",
    icon: Gpu,
    articles: [
      { id: "gpu-types", title: "Available GPU types and specifications", readTime: "8 min read" },
      { id: "instance-types", title: "Instance types and configurations", readTime: "6 min read" },
      { id: "gpu-performance", title: "GPU performance benchmarks", readTime: "10 min read" },
      { id: "multi-gpu", title: "Working with multi-GPU setups", readTime: "9 min read" },
      { id: "gpu-monitoring", title: "Monitoring GPU performance", readTime: "7 min read" },
    ],
  },
  {
    id: "tutorials",
    title: "Tutorials",
    description: "Step-by-step guides for common tasks and workflows",
    icon: BookOpen,
    articles: [
      { id: "pytorch-setup", title: "Setting up PyTorch environment", readTime: "12 min read" },
      { id: "tensorflow-setup", title: "Setting up TensorFlow environment", readTime: "11 min read" },
      { id: "stable-diffusion", title: "Running Stable Diffusion on Nylon Hosting Service", readTime: "15 min read" },
      { id: "jupyter-notebook", title: "Setting up Jupyter Notebook", readTime: "8 min read" },
      { id: "docker-containers", title: "Working with Docker containers", readTime: "14 min read" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Comprehensive documentation for the Nylon Hosting Service API",
    icon: Code,
    articles: [
      { id: "api-overview", title: "API Overview and Authentication", readTime: "9 min read" },
      { id: "instance-api", title: "Instance Management API", readTime: "13 min read" },
      { id: "gpu-api", title: "GPU Resources API", readTime: "11 min read" },
      { id: "billing-api", title: "Billing and Usage API", readTime: "8 min read" },
      { id: "webhooks", title: "Webhooks and Event Notifications", readTime: "10 min read" },
    ],
  },
  {
    id: "cli-reference",
    title: "CLI Reference",
    description: "Command-line interface documentation and examples",
    icon: Terminal,
    articles: [
      { id: "cli-installation", title: "Installing the Nylon Hosting Service CLI", readTime: "4 min read" },
      { id: "cli-authentication", title: "CLI Authentication and Configuration", readTime: "6 min read" },
      { id: "instance-commands", title: "Instance Management Commands", readTime: "9 min read" },
      { id: "monitoring-commands", title: "Monitoring and Logging Commands", readTime: "7 min read" },
      { id: "advanced-cli", title: "Advanced CLI Usage and Scripting", readTime: "12 min read" },
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices",
    description: "Recommendations for optimal performance and cost efficiency",
    icon: FileText,
    articles: [
      { id: "cost-optimization", title: "Cost Optimization Strategies", readTime: "8 min read" },
      { id: "security-best-practices", title: "Security Best Practices", readTime: "10 min read" },
      { id: "performance-tuning", title: "Performance Tuning for GPU Workloads", readTime: "14 min read" },
      { id: "data-management", title: "Data Management and Storage", readTime: "9 min read" },
      { id: "scaling-strategies", title: "Scaling Strategies for ML Workloads", readTime: "11 min read" },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-[var(--bg-dark)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/10 to-blue-900/10 opacity-30"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Documentation</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                Nylon Hosting Service Documentation
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Comprehensive guides, tutorials, and reference materials to help you get the most out of our GPU hosting
                platform.
              </p>
              <div className="w-full max-w-xl relative mt-4">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full pl-10 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {docCategories.map((category) => (
                <Card
                  key={category.id}
                  className="bg-[var(--bg-card)] border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <CardTitle className="text-white">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-slate-400">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.slice(0, 3).map((article) => (
                        <li key={article.id}>
                          <Link
                            href={`/docs/${category.id}/${article.id}`}
                            className="flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                          >
                            <span>{article.title}</span>
                            <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-700">
                              {article.readTime}
                            </Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      asChild
                    >
                      <Link href={`/docs/${category.id}`}>
                        <span>View all articles</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Popular Guides */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">Popular Guides</h2>
              <p className="text-lg text-slate-400 max-w-[700px]">
                Our most frequently accessed documentation to help you get started quickly
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Setting up PyTorch environment",
                  description: "Learn how to set up a PyTorch environment on your GPU instance for deep learning",
                  category: "Tutorials",
                  readTime: "12 min read",
                  icon: BookOpen,
                },
                {
                  title: "GPU performance benchmarks",
                  description: "Detailed benchmarks of different GPU models for various workloads",
                  category: "GPU Instances",
                  readTime: "10 min read",
                  icon: Gpu,
                },
                {
                  title: "Cost optimization strategies",
                  description: "Tips and strategies to optimize your GPU usage costs",
                  category: "Best Practices",
                  readTime: "8 min read",
                  icon: FileText,
                },
                {
                  title: "Instance Management API",
                  description: "API reference for managing your GPU instances programmatically",
                  category: "API Reference",
                  readTime: "13 min read",
                  icon: Code,
                },
                {
                  title: "Running Stable Diffusion",
                  description: "Step-by-step guide to running Stable Diffusion on Nylon Hosting Service",
                  category: "Tutorials",
                  readTime: "15 min read",
                  icon: BookOpen,
                },
                {
                  title: "Advanced CLI Usage",
                  description: "Advanced techniques for using the Nylon Hosting Service CLI",
                  category: "CLI Reference",
                  readTime: "12 min read",
                  icon: Terminal,
                },
              ].map((guide, index) => (
                <Card
                  key={index}
                  className="bg-[var(--bg-card)] border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-md bg-purple-500/10 flex items-center justify-center">
                        <guide.icon className="h-4 w-4 text-purple-400" />
                      </div>
                      <Badge variant="outline" className="bg-slate-800/50 text-slate-400 border-slate-700">
                        {guide.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-2">{guide.title}</CardTitle>
                    <CardDescription className="text-slate-400">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-slate-400">{guide.readTime}</span>
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0 h-auto"
                    >
                      Read guide
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="space-y-4 md:w-1/2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Need Help?</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl gradient-text">
                  Can&apos;t find what you&apos;re looking for?
                </h2>
                <p className="text-lg text-slate-400">
                  Our support team is here to help. Reach out to us with any questions or issues you&apos;re facing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:w-1/2">
                <Button className="gradient-purple-blue gradient-purple-blue-hover">Contact Support</Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Request a Feature
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

