import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3, CreditCard, HardDrive, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeAware } from "@/components/theme-aware"

export const metadata: Metadata = {
  title: "Dashboard - Nylon Hosting",
  description: "Manage your hosting services and account settings",
}

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ThemeAware>
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
        </ThemeAware>

        <ThemeAware>
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$149.99</div>
              <p className="text-xs text-muted-foreground">+$29.99 from last month</p>
            </CardContent>
          </Card>
        </ThemeAware>

        <ThemeAware>
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45%</div>
              <p className="text-xs text-muted-foreground">35GB of 80GB used</p>
            </CardContent>
          </Card>
        </ThemeAware>

        <ThemeAware>
          <Card className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bandwidth</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2TB</div>
              <p className="text-xs text-muted-foreground">of 5TB monthly allowance</p>
            </CardContent>
          </Card>
        </ThemeAware>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/vps">
            <ThemeAware>
              <Card className="card-gradient h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <Server className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Manage VPS</CardTitle>
                  <CardDescription>Configure and monitor your virtual servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You have 2 active VPS instances running. View performance metrics and make adjustments.
                  </p>
                </CardContent>
              </Card>
            </ThemeAware>
          </Link>

          {/* Repeat for other cards */}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
        <ThemeAware>
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-accent p-3">
                    <div className="flex-1">
                      <p className="font-medium">New server provisioned</p>
                      <p className="text-sm text-muted-foreground">User ID: #1234{i} - Pro VPS Plan</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {i} hour{i !== 1 ? "s" : ""} ago
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ThemeAware>
      </div>
    </div>
  )
}
