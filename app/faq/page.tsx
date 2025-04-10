import type { Metadata } from "next"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GlowEffect } from "@/components/glow-effect"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "FAQ - Nylon Hosting",
  description: "Frequently asked questions about Nylon Hosting services",
}

export default function FaqPage() {
  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is Nylon Hosting?",
          answer:
            "Nylon Hosting is a high-performance hosting provider offering VPS, dedicated servers, and cloud hosting solutions for businesses of all sizes. We focus on reliability, security, and performance to ensure your applications run smoothly.",
        },
        {
          question: "How do I get started with Nylon Hosting?",
          answer:
            "Getting started is easy! Simply create an account, choose the hosting plan that fits your needs, and complete the checkout process. Your server will be provisioned within minutes, and you&apos;ll receive login details via email.",
        },
        {
          question: "Do you offer a money-back guarantee?",
          answer:
            "Yes, we offer a 30-day money-back guarantee on all our hosting plans. If you&apos;re not satisfied with our service within the first 30 days, you can request a full refund.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.",
        },
      ],
    },
    {
      title: "Technical Questions",
      questions: [
        {
          question: "What operating systems do you support?",
          answer:
            "We support a wide range of operating systems including Ubuntu, Debian, CentOS, Fedora, and Windows Server. You can choose your preferred OS during the server setup process.",
        },
        {
          question: "Do you provide root access to servers?",
          answer:
            "Yes, all our VPS and dedicated server plans come with full root access, giving you complete control over your server environment.",
        },
        {
          question: "How do you handle server backups?",
          answer:
            "We offer automated backup solutions with all our hosting plans. Depending on your plan, backups may be performed daily, weekly, or hourly. You can also create manual backups at any time through your control panel.",
        },
        {
          question: "What kind of support do you offer?",
          answer:
            "We provide 24/7 technical support via ticket system, email, and live chat. Our support team is highly skilled and ready to assist you with any issues you may encounter.",
        },
      ],
    },
    {
      title: "Billing and Account",
      questions: [
        {
          question: "How does billing work?",
          answer:
            "Our hosting plans are billed on a monthly basis. You can also choose quarterly, semi-annual, or annual billing cycles for additional discounts. All invoices are sent via email and can be viewed in your client area.",
        },
        {
          question: "Can I upgrade my plan later?",
          answer:
            "Yes, you can upgrade your hosting plan at any time through your client area. The upgrade process is seamless and typically takes just a few minutes to complete.",
        },
        {
          question: "How do I cancel my service?",
          answer:
            "You can cancel your service at any time through your client area. Navigate to the &apos;Services&apos; section, select the service you wish to cancel, and click on the &apos;Cancel&apos; button. Our team will process your request within 24 hours.",
        },
        {
          question: "Do you offer discounts for annual payments?",
          answer:
            "Yes, we offer discounts for longer billing cycles. You can save up to 20% by choosing annual billing instead of monthly billing.",
        },
      ],
    },
  ]

  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-muted-foreground">
            Find answers to common questions about our hosting services, billing, and technical support.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                    <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-lg border bg-muted/40 p-6 text-center">
          <h2 className="text-xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Our support team is available 24/7 to help you with any questions you may have.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button>Contact Support</Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
