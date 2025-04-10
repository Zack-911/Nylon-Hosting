"use client" // 🔥 Add this at the top since you're using client-only logic

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { GlowEffect } from "@/components/glow-effect"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="relative min-h-screen">
      <GlowEffect />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your hosting services and account settings</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/dashboard">
            <Button variant={pathname === "/dashboard" ? "default" : "outline"}>Overview</Button>
          </Link>
          <Link href="/dashboard/vps">
            <Button variant={pathname.includes("/vps") ? "default" : "outline"}>VPS Servers</Button>
          </Link>
          <Link href="/dashboard/server">
            <Button variant={pathname.includes("/server") ? "default" : "outline"}>Dedicated Servers</Button>
          </Link>
          <Link href="/dashboard/billing">
            <Button variant={pathname.includes("/billing") ? "default" : "outline"}>Billing</Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant={pathname.includes("/settings") ? "default" : "outline"}>Settings</Button>
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}