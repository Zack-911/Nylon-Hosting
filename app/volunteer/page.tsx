"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Server, Shield, Globe, ChevronRight, Rocket, BookOpen, ExternalLink } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import styles from "@/styles/modules/animations.module.css"
import Link from "next/link"

export default function VolunteerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Join Our Team</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none gradient-text">
                  Volunteer with Nylon Hosting Services
                </h1>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Help build the future of hosting while gaining valuable experience, connections, and resources.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gradient-purple-blue gradient-purple-blue-hover">Apply Now</Button>
                <Button variant="outline" className="border-purple-500/20 text-white hover:bg-purple-500/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-10"></div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Benefits</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">Why Volunteer With Us</h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Joining our volunteer team offers numerous benefits for your career and personal growth.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Rocket className={`h-10 w-10 text-blue-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Gain Real Experience</CardTitle>
                    <CardDescription className="text-slate-400">
                      Work on real-world projects that serve actual users and businesses.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Collaborate with experienced developers
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Build a portfolio of professional work
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                        Learn industry best practices
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Server className={`h-10 w-10 text-purple-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Free VPS Access</CardTitle>
                    <CardDescription className="text-slate-400">
                      Active volunteers receive free VPS hosting for their personal projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Dedicated resources for your applications
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        Full root access and SSH capabilities
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                        SSD storage and high bandwidth
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`}>
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <BookOpen className={`h-10 w-10 text-green-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Learning Opportunities</CardTitle>
                    <CardDescription className="text-slate-400">
                      Access to training resources and mentorship from industry professionals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        Mentorship from experienced team members
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        Access to premium learning resources
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                        Regular skill development workshops
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Volunteer Roles</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Find Your Perfect Role
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We have opportunities for various skill sets and experience levels. Choose the role that best matches
                  your interests.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2">
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="100">
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Globe className={`h-10 w-10 text-blue-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Front-End Development</CardTitle>
                    <CardDescription className="text-slate-400">
                      Create beautiful, responsive user interfaces for our platform and client projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Requirements:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Experience with React, Next.js, or similar frameworks
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Proficiency in HTML, CSS, and JavaScript
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Understanding of responsive design principles
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Familiarity with UI/UX best practices
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Responsibilities:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Develop and maintain user interfaces
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Implement responsive designs
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Collaborate with designers and back-end developers
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-1 mt-0.5" />
                            Optimize applications for performance
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Apply for This Role
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="200">
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Code className={`h-10 w-10 text-purple-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Back-End Development</CardTitle>
                    <CardDescription className="text-slate-400">
                      Build robust server-side applications, APIs, and database solutions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Requirements:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Experience with Node.js, Python, Go, or similar
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Knowledge of database systems (SQL/NoSQL)
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Understanding of RESTful APIs and microservices
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Familiarity with version control systems
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Responsibilities:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Develop server-side logic and APIs
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Design and implement database schemas
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Ensure high performance and responsiveness
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-purple-500 mr-1 mt-0.5" />
                            Implement security and data protection measures
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Apply for This Role
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="300">
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Shield className={`h-10 w-10 text-yellow-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Cybersecurity</CardTitle>
                    <CardDescription className="text-slate-400">
                      Help secure our infrastructure and protect our users&apos; data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Requirements:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Knowledge of network security principles
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Experience with security tools and practices
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Understanding of common vulnerabilities
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Familiarity with security compliance standards
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Responsibilities:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Perform security assessments and audits
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Implement security measures and protocols
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Monitor systems for security breaches
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-1 mt-0.5" />
                            Develop security documentation and guidelines
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Apply for This Role
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="400">
                <Card className="h-full bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <Server className={`h-10 w-10 text-green-500 mb-2 ${styles.pulseAnimation}`} />
                    <CardTitle className="text-white">Server Management</CardTitle>
                    <CardDescription className="text-slate-400">
                      Maintain and optimize our server infrastructure and containerized applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Requirements:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Experience with Linux server administration
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Knowledge of containerization technologies
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Understanding of networking principles
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Familiarity with monitoring and logging systems
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Required Courses:</h3>
                        <ul className="space-y-4 text-sm text-slate-300">
                          <li className="flex flex-col">
                            <Link
                              href="https://www.codecademy.com/learn/ext-courses/working-with-containers-introduction-to-docker"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-md bg-[#0a0a0f] hover:bg-[#12121a] transition-colors border border-slate-800"
                            >
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                                <span>Introduction to Docker</span>
                                <ExternalLink className="h-4 w-4 ml-2 text-slate-400" />
                              </div>
                              <p className="text-xs text-slate-400 mt-1 ml-7">
                                Learn the fundamentals of containerization with Docker
                              </p>
                            </Link>
                          </li>
                          <li className="flex flex-col">
                            <Link
                              href="https://www.codecademy.com/learn/ext-courses/working-with-containers-introduction-to-kubernetes"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-md bg-[#0a0a0f] hover:bg-[#12121a] transition-colors border border-slate-800"
                            >
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-green-500 mr-2" />
                                <span>Introduction to Kubernetes</span>
                                <ExternalLink className="h-4 w-4 ml-2 text-slate-400" />
                              </div>
                              <p className="text-xs text-slate-400 mt-1 ml-7">
                                Master container orchestration with Kubernetes
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Responsibilities:</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Maintain and optimize server infrastructure
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Deploy and manage containerized applications
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Monitor system performance and uptime
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-1 mt-0.5" />
                            Implement automation for deployment and scaling
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      Apply for This Role
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">How to Apply</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">Application Process</h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these steps to join our volunteer team.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 py-12">
              <div className="relative pl-8 pb-8 border-l border-slate-700" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute top-0 left-0 -translate-x-1/2 size-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Submit Your Application</h3>
                <p className="text-slate-400">
                  Fill out our online application form with your contact information, skills, and preferred volunteer
                  role.
                </p>
              </div>
              <div className="relative pl-8 pb-8 border-l border-slate-700" data-aos="fade-up" data-aos-delay="200">
                <div className="absolute top-0 left-0 -translate-x-1/2 size-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Initial Screening</h3>
                <p className="text-slate-400">
                  Our team will review your application and reach out to schedule an initial conversation if
                  there&apos;s a good fit.
                </p>
              </div>
              <div className="relative pl-8 pb-8 border-l border-slate-700" data-aos="fade-up" data-aos-delay="300">
                <div className="absolute top-0 left-0 -translate-x-1/2 size-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Skills Assessment</h3>
                <p className="text-slate-400">
                  Complete a brief skills assessment related to your chosen role to help us understand your current
                  abilities.
                </p>
              </div>
              <div className="relative pl-8 pb-8 border-l border-slate-700" data-aos="fade-up" data-aos-delay="400">
                <div className="absolute top-0 left-0 -translate-x-1/2 size-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Team Interview</h3>
                <p className="text-slate-400">
                  Meet with team members to discuss your experience, goals, and how you can contribute to our projects.
                </p>
              </div>
              <div className="relative pl-8" data-aos="fade-up" data-aos-delay="500">
                <div className="absolute top-0 left-0 -translate-x-1/2 size-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">5</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Onboarding</h3>
                <p className="text-slate-400">
                  If selected, you&apos;ll receive an invitation to join our team, along with onboarding materials and
                  your first tasks.
                </p>
              </div>
            </div>
            <div className="flex justify-center" data-aos="fade-up" data-aos-delay="600">
              <Button className="gradient-purple-blue gradient-purple-blue-hover px-8 py-6 text-lg">
                Start Your Application
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-[#030305]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">FAQ</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our volunteer program.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl space-y-6 py-12">
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="100">
                <Card className="bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">How much time do I need to commit?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p>
                      We&apos;re flexible with time commitments. Most volunteers contribute 5-10 hours per week, but we
                      can work with your schedule. The minimum commitment is 3 months to ensure you have enough time to
                      integrate with the team and make meaningful contributions.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="200">
                <Card className="bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Do I need to have professional experience?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p>
                      No, professional experience is not required. We welcome volunteers with various skill levels, from
                      beginners to experts. What&apos;s most important is your willingness to learn and contribute. We
                      provide mentorship and resources to help you grow.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="300">
                <Card className="bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">What kind of VPS resources do volunteers receive?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p>
                      Active volunteers receive a VPS with dedicated CPU cores, RAM, and SSD storage. The exact
                      specifications depend on your role and project needs. All VPS instances come with full root
                      access, SSH capabilities, and high bandwidth. This benefit is available after your first month of
                      active contribution.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="400">
                <Card className="bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Can I list this volunteer work on my resume?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p>
                      We encourage you to include your volunteer work with Nylon Hosting Service on your resume. We can
                      also provide reference letters and LinkedIn recommendations for volunteers who make significant
                      contributions to our projects.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className={`glow-effect ${styles.cardHover}`} data-aos="fade-up" data-aos-delay="500">
                <Card className="bg-[var(--bg-card)] border-slate-800 relative z-10">
                  <CardHeader>
                    <CardTitle className="text-white">Is there a possibility of paid work in the future?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <p>
                      Yes, exceptional volunteers are often considered first when paid positions become available. Many
                      of our current team members started as volunteers. While we can&apos;t guarantee paid positions,
                      volunteering is an excellent way to demonstrate your skills and work ethic.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[var(--bg-dark)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center" data-aos="fade-up">
              <div className="space-y-2">
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Join Us Today</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  Ready to Make an Impact?
                </h2>
                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our team of passionate volunteers and help shape the future of hosting while building your skills
                  and portfolio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="gradient-purple-blue gradient-purple-blue-hover px-8 py-6 text-lg">Apply Now</Button>
                <Button
                  variant="outline"
                  className="border-purple-500/20 text-white hover:bg-purple-500/10 px-8 py-6 text-lg"
                >
                  Contact Us
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
