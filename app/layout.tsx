import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "Nylon Hosting Service - Comprehensive Hosting & GPU Marketplace",
  description:
    "Host websites, Discord bots, applications, and access high-performance GPU resources on our cutting-edge infrastructure.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

