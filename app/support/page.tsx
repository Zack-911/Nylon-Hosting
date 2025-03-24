"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Search, Users, FileQuestion, Server, Shield, CreditCard } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// FAQ categories
const faqCategories = [
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    questions: [
      {
        question: "What is Nylon Hosting Service?",
        answer:
          "Nylon Hosting Service is a comprehensive hosting platform that provides high-performance GPU instances for AI, machine learning, rendering, and other compute-intensive workloads. We offer a variety of NVIDIA and AMD GPUs with flexible pricing options.",
      },
      {
        question: "How do I get started with Nylon Hosting Service?",
        answer:
          "Getting started is easy! Simply create an account, add a payment method, and deploy your first GPU instance. Check out our Getting Started guide in the documentation for step-by-step instructions.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency payments (Bitcoin, Ethereum). For enterprise customers, we also offer invoicing options.",
      },
      {
        question: "Is there a minimum commitment period?",
        answer:
          "No, we offer pay-as-you-go pricing with no minimum commitment. You can deploy instances for as little as one hour. We also offer discounted rates for reserved instances with 1-month or 3-month commitments.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "Yes, new users can get a $50 credit to try out our platform. This credit is valid for 14 days and can be used for any of our GPU instances.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    icon: Server,
    questions: [
      {
        question: "What GPUs do you offer?",
        answer:
          "We offer a wide range of NVIDIA and AMD GPUs, including NVIDIA RTX 4090, RTX 3090, A100, H100, and AMD Instinct MI250. Check our pricing page for the full list of available GPUs and their specifications.",
      },
      {
        question: "What operating systems are supported?",
        answer:
          "We support Ubuntu 22.04 LTS, Ubuntu 20.04 LTS, Debian 11, Windows Server 2022, and Windows 10 Pro. We also offer pre-configured ML environments with PyTorch or TensorFlow.",
      },
      {
        question: "Can I use multiple GPUs in a single instance?",
        answer:
          "Yes, we offer multi-GPU configurations for select GPU types. You can deploy instances with up to 8 GPUs, depending on availability and the GPU model.",
      },
      {
        question: "How do I connect to my instance?",
        answer:
          "For Linux instances, you can connect using SSH with your key pair. For Windows instances, you can use Remote Desktop Protocol (RDP). Detailed connection instructions are provided after you deploy an instance.",
      },
      {
        question: "What is the network bandwidth?",
        answer:
          "Our standard instances come with 1 Gbps network connectivity. High-performance instances offer up to 10 Gbps bandwidth. You can select your bandwidth requirements during instance creation.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Pricing",
    icon: CreditCard,
    questions: [
      {
        question: "How does billing work?",
        answer:
          "We offer hourly, daily, and monthly billing options. Hourly billing is charged only for the time your instance is running. Daily rates apply for instances running more than 12 hours in a 24-hour period. Monthly rates provide the best value for continuous usage.",
      },
      {
        question: "When am I charged for my instances?",
        answer:
          "For hourly and daily billing, charges are accumulated and billed at the end of each calendar month. For monthly billing, you're charged upfront for the 30-day period.",
      },
      {
        question: "Can I set spending limits?",
        answer:
          "Yes, you can set spending limits in your account settings. When you reach your spending limit, you'll be notified, and you can choose to increase the limit or have your instances automatically stopped.",
      },
      {
        question: "Do you offer volume discounts?",
        answer:
          "Yes, we offer volume discounts for customers who use multiple instances or have high usage. Contact our sales team for more information about volume pricing.",
      },
      {
        question: "What happens if I stop my instance?",
        answer:
          "When you stop an instance, you're no longer charged for the GPU usage. However, you'll still be charged for any persistent storage attached to the instance. To avoid all charges, you need to terminate the instance.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: Shield,
    questions: [
      {
        question: "How secure is my data?",
        answer:
          "We take security seriously. All data is encrypted at rest and in transit. We use industry-standard security practices and regularly undergo security audits. Your instances run in isolated environments to ensure data privacy.",
      },
      {
        question: "Are you GDPR compliant?",
        answer:
          "Yes, we are fully GDPR compliant. We only collect and process data necessary for providing our services. You can request a copy of your data or deletion of your account at any time.",
      },
      {
        question: "Do you offer private networking?",
        answer:
          "Yes, you can deploy instances in a private network that's isolated from the internet. You can also set up VPC peering to connect your instances to your existing infrastructure.",
      },
      {
        question: "How do you handle security updates?",
        answer:
          "We regularly update our base images with the latest security patches. For running instances, you're responsible for applying updates, but we provide tools and documentation to help you keep your instances secure.",
      },
      {
        question: "Do you offer DDoS protection?",
        answer:
          "Yes, all instances come with basic DDoS protection. For customers with higher security requirements, we offer advanced DDoS protection as an add-on service.",
      },
    ],
  },
]

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-[var(--bg-dark)] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/10 to-blue-900/10 opacity-30"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Support & Community</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text">
                How can we help you?
              </h1>
              <p className="text-xl text-slate-400 max-w-[700px]">
                Find answers to common questions, get help from our support team, or join our community discussions.
              </p>
              <div className="w-full max-w-xl relative mt-4">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="w-full pl-10 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50">
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                </TabsList>
              </div>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Category Sidebar */}
                  <div className="md:w-1/4 space-y-4">
                    <h2 className="text-xl font-bold text-white">Categories</h2>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${selectedCategory === "all" ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                        onClick={() => setSelectedCategory("all")}
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        All Categories
                      </Button>
                      {faqCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant="ghost"
                          className={`w-full justify-start ${selectedCategory === category.id ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.title}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Content */}
                  <div className="md:w-3/4">
                    <div className="space-y-6">
                      {selectedCategory === "all" ? (
                        faqCategories.map((category) => (
                          <div key={category.id} className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <category.icon className="h-5 w-5 text-purple-400" />
                              <h2 className="text-xl font-bold text-white">{category.title}</h2>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                              {category.questions.map((faq, index) => (
                                <AccordionItem
                                  key={index}
                                  value={`${category.id}-${index}`}
                                  className="border-slate-700"
                                >
                                  <AccordionTrigger className="text-white hover:text-purple-400 hover:no-underline">
                                    {faq.question}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-slate-300">{faq.answer}</AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-4">
                          {faqCategories.find((cat) => cat.id === selectedCategory) && (
                            <>
                              <div className="flex items-center space-x-2">
                                {(() => {
                                  const category = faqCategories.find((cat) => cat.id === selectedCategory)
                                  const Icon = category?.icon || HelpCircle
                                  return <Icon className="h-5 w-5 text-purple-400" />
                                })()}
                                <h2 className="text-xl font-bold text-white">
                                  {faqCategories.find((cat) => cat.id === selectedCategory)?.title}
                                </h2>
                              </div>
                              <Accordion type="single" collapsible className="w-full">
                                {faqCategories
                                  .find((cat) => cat.id === selectedCategory)
                                  ?.questions.map((faq, index) => (
                                    <AccordionItem
                                      key={index}
                                      value={`${selectedCategory}-${index}`}
                                      className="border-slate-700"
                                    >
                                      <AccordionTrigger className="text-white hover:text-purple-400 hover:no-underline">
                                        {faq.question}
                                      </AccordionTrigger>
                                      <AccordionContent className="text-slate-300">{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                  ))}
                              </Accordion>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 p-6 bg-[var(--bg-card)] border border-slate-700 rounded-lg">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <h3 className="text-lg font-medium text-white">Still have questions?</h3>
                          <p className="text-slate-400">Our support team is here to help</p>
                        </div>
                        <Button
                          className="gradient-purple-blue gradient-purple-blue-hover"
                          onClick={() => setActiveTab("contact")}
                        >
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <Card className="bg-[var(--bg-card)] border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Support</CardTitle>
                      <CardDescription className="text-slate-400">
                        Fill out the form below and our support team will get back to you as soon as possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm text-slate-300">
                            First name
                          </label>
                          <Input
                            id="first-name"
                            className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm text-slate-300">
                            Last name
                          </label>
                          <Input
                            id="last-name"
                            className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-slate-300">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm text-slate-300">
                          Subject
                        </label>
                        <Select>
                          <SelectTrigger
                            id="subject"
                            className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500"
                          >
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Inquiry</SelectItem>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm text-slate-300">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          className="min-h-[150px] bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                          placeholder="Please describe your issue in detail..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="attachments" className="text-sm text-slate-300">
                          Attachments (optional)
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-slate-700 bg-slate-800/50 hover:bg-slate-800"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-slate-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-slate-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-slate-500">PNG, JPG, GIF, PDF up to 10MB</p>
                            </div>
                            <input id="file-upload" type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                        Submit Support Request
                      </Button>
                    </CardFooter>
                  </Card>

                  <div className="space-y-6">
                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Support Options</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Separator className="my-4 bg-slate-700" />

                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center mt-1">
                            <FileQuestion className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">Knowledge Base</h3>
                            <p className="text-slate-400 mb-2">
                              Browse our extensive knowledge base for detailed articles and guides.
                            </p>
                            <Button
                              variant="outline"
                              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              asChild
                            >
                              <Link href="/docs">Browse Documentation</Link>
                            </Button>
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 rounded-md bg-purple-500/10 flex items-center justify-center mt-1">
                            <Users className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white">Community Discord</h3>
                            <p className="text-slate-400 mb-2">
                              Connect with other users and get help from the community.
                            </p>
                            <Button
                              variant="outline"
                              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              asChild
                            >
                              <Link href="https://discord.gg/VkEAYEtWgh">Join The Discord Server</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Support Hours</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monday - Friday</span>
                          <span className="font-medium text-white">9:00 AM - 8:00 PM ET</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Saturday</span>
                          <span className="font-medium text-white">10:00 AM - 6:00 PM ET</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sunday</span>
                          <span className="font-medium text-white">Closed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Emergency Support</span>
                          <span className="font-medium text-green-400">24/7</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">
                          Emergency support is available 24/7 for critical issues affecting production environments.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

