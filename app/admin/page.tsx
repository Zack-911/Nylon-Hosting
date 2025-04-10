import type { Metadata } from "next"
import { BarChart3, CreditCard, Server, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowEffect } from "@/components/glow-effect"

export const metadata: Metadata = {
  title: "Admin Dashboard - Nylon Hosting",
  description: "Manage your hosting services and users",
}

// Data constants
const overviewData = [
  { title: "Total Users", value: "1,248", change: "+42 from last month", icon: Users },
  { title: "Active Servers", value: "867", change: "+24 from last month", icon: Server },
  { title: "Monthly Revenue", value: "$48,492", change: "+12.5% from last month", icon: CreditCard },
  { title: "System Load", value: "42%", change: "-8% from last month", icon: BarChart3 },
]

const recentActivity = [
  { id: 1, description: "New server provisioned", details: "User ID: #12341 - Pro VPS Plan", time: "1 hour ago" },
  { id: 2, description: "New server provisioned", details: "User ID: #12342 - Pro VPS Plan", time: "2 hours ago" },
  { id: 3, description: "New server provisioned", details: "User ID: #12343 - Pro VPS Plan", time: "3 hours ago" },
  { id: 4, description: "New server provisioned", details: "User ID: #12344 - Pro VPS Plan", time: "4 hours ago" },
  { id: 5, description: "New server provisioned", details: "User ID: #12345 - Pro VPS Plan", time: "5 hours ago" },
]

const systemStatus = [
  { label: "CPU Usage", value: "42%" },
  { label: "Memory Usage", value: "68%" },
  { label: "Storage Usage", value: "54%" },
  { label: "Network Usage", value: "76%" },
]

const usersData = [
  { id: 1001, name: "User 1", email: "user1@example.com", status: "Active" },
  { id: 1002, name: "User 2", email: "user2@example.com", status: "Active" },
  { id: 1003, name: "User 3", email: "user3@example.com", status: "Active" },
  { id: 1004, name: "User 4", email: "user4@example.com", status: "Active" },
  { id: 1005, name: "User 5", email: "user5@example.com", status: "Active" },
]

export default function AdminPage() {
  return (
    <div className="relative">
      <GlowEffect />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your hosting services, users, and system settings</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overviewData.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">{item.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-3">
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus.map((status, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{status.label}</p>
                          <p className="text-sm text-muted-foreground">{status.value}</p>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: status.value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage your users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search users..." className="w-[300px]" />
                      <Button variant="outline">Search</Button>
                    </div>
                    <Button>Add User</Button>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usersData.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>#{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge
                                className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// These components are just placeholders for the admin page
// In a real implementation, you would import these from your UI library
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  )
}

import { ReactNode } from "react";

function Table({ children }: { children: ReactNode }) {
  return <table className="w-full caption-bottom text-sm">{children}</table>
}

function TableHeader({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>
}

function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">{children}</tr>
}

function TableHead({ children }: { children: ReactNode }) {
  return <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{children}</th>
}

function TableCell({ children }: { children: ReactNode }) {
  return <td className="p-4 align-middle">{children}</td>
}

function Badge({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
  )
}
