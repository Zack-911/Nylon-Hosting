"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  CreditCardIcon,
  LogIn,
  UserPlus,
  Settings,
  History,
  Wallet,
  Github,
  ChromeIcon as Google,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [profileTab, setProfileTab] = useState("general")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container max-w-6xl px-4 py-12 md:py-16 lg:py-24">
          {/* Authentication Section */}
          {(activeTab === "login" || activeTab === "register") && (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-400">
                  {activeTab === "login" ? "Welcome Back" : "Join Nylon Hosting Service"}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  {activeTab === "login" ? "Sign in to your account" : "Create your account"}
                </h1>
                <p className="text-lg text-slate-400 max-w-[600px]">
                  {activeTab === "login"
                    ? "Access your GPU instances, manage your account, and view your billing information."
                    : "Get started with Nylon Hosting Service to deploy high-performance GPU instances for your workloads."}
                </p>
              </div>
              <div className="glow-effect">
                <Card className="bg-[var(--bg-card)]/70 border-slate-800 backdrop-blur-xs relative z-10">
                  <CardHeader>
                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                      </TabsList>

                      {/* Login Form */}
                      <TabsContent value="login" className="mt-4 space-y-4">
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Continue with GitHub
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            <Google className="mr-2 h-4 w-4" />
                            Continue with Google
                          </Button>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700"></span>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="bg-[var(--bg-card)] px-2 text-slate-400">or continue with email</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-9 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password" className="text-slate-300">
                                Password
                              </Label>
                              <Link
                                href="/account/reset-password"
                                className="text-xs text-purple-400 hover:text-purple-300"
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                              <Input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-9 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                              <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                              >
                                {passwordVisible ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="remember-me"
                              checked={rememberMe}
                              onCheckedChange={setRememberMe}
                              className="data-[state=checked]:bg-purple-500"
                            />
                            <Label htmlFor="remember-me" className="text-sm text-slate-300">
                              Remember me
                            </Label>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Register Form */}
                      <TabsContent value="register" className="mt-4 space-y-4">
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Sign up with GitHub
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            <Google className="mr-2 h-4 w-4" />
                            Sign up with Google
                          </Button>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700"></span>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="bg-[var(--bg-card)] px-2 text-slate-400">or sign up with email</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name" className="text-slate-300">
                                First name
                              </Label>
                              <Input
                                id="first-name"
                                placeholder="John"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name" className="text-slate-300">
                                Last name
                              </Label>
                              <Input
                                id="last-name"
                                placeholder="Doe"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-email" className="text-slate-300">
                              Email
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                              <Input
                                id="register-email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-9 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password" className="text-slate-300">
                              Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                              <Input
                                id="register-password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-9 bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                              <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                              >
                                {passwordVisible ? "Hide" : "Show"}
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              Password must be at least 8 characters long and include a number and a special character.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="terms" className="data-[state=checked]:bg-purple-500" />
                            <Label htmlFor="terms" className="text-sm text-slate-300">
                              I agree to the{" "}
                              <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                                Privacy Policy
                              </Link>
                            </Label>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                      {activeTab === "login" ? (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {/* Account Management Section */}
          {activeTab === "account" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter gradient-text">Account Settings</h1>
                  <p className="text-lg text-slate-400 mt-1">Manage your profile, security, and billing information</p>
                </div>
                <Button className="gradient-purple-blue gradient-purple-blue-hover md:self-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </div>

              <div className="grid gap-8 lg:grid-cols-[250px_1fr] lg:gap-12">
                {/* Sidebar Navigation */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="relative h-12 w-12 rounded-full bg-linear-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">JD</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">John Doe</p>
                      <p className="text-sm text-slate-400">john.doe@example.com</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${profileTab === "general" ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                      onClick={() => setProfileTab("general")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      General
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${profileTab === "security" ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                      onClick={() => setProfileTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${profileTab === "billing" ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                      onClick={() => setProfileTab("billing")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${profileTab === "notifications" ? "bg-slate-800/50 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800/30"}`}
                      onClick={() => setProfileTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </div>

                  <Separator className="my-4 bg-slate-700" />

                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/30"
                    >
                      <History className="mr-2 h-4 w-4" />
                      Usage History
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/30"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      API Keys
                    </Button>
                  </div>
                </div>

                {/* Main Content Area */}
                <div>
                  {/* General Profile Settings */}
                  {profileTab === "general" && (
                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Profile Information</CardTitle>
                        <CardDescription className="text-slate-400">
                          Update your account details and profile information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="relative h-20 w-20 rounded-full bg-linear-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                              <span className="text-white font-bold text-2xl">JD</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              >
                                Upload Photo
                              </Button>
                              <Button variant="ghost" className="text-slate-400 hover:text-white">
                                Remove
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="profile-first-name" className="text-slate-300">
                                First name
                              </Label>
                              <Input
                                id="profile-first-name"
                                defaultValue="John"
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="profile-last-name" className="text-slate-300">
                                Last name
                              </Label>
                              <Input
                                id="profile-last-name"
                                defaultValue="Doe"
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profile-email" className="text-slate-300">
                              Email
                            </Label>
                            <Input
                              id="profile-email"
                              type="email"
                              defaultValue="john.doe@example.com"
                              className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profile-company" className="text-slate-300">
                              Company (Optional)
                            </Label>
                            <Input
                              id="profile-company"
                              placeholder="Your company name"
                              className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profile-timezone" className="text-slate-300">
                              Timezone
                            </Label>
                            <Select defaultValue="utc-8">
                              <SelectTrigger className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                                <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                                <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                                <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                                <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                                <SelectItem value="utc">UTC+00:00</SelectItem>
                                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                                <SelectItem value="utc+5.5">UTC+05:30</SelectItem>
                                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                                <SelectItem value="utc+8">UTC+08:00</SelectItem>
                                <SelectItem value="utc+9">UTC+09:00</SelectItem>
                                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                                <SelectItem value="utc+12">UTC+12:00</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" className="text-slate-400 hover:text-white">
                          Cancel
                        </Button>
                        <Button className="gradient-purple-blue gradient-purple-blue-hover">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  )}

                  {/* Security Settings */}
                  {profileTab === "security" && (
                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Security Settings</CardTitle>
                        <CardDescription className="text-slate-400">
                          Manage your password and account security
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Change Password</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password" className="text-slate-300">
                                Current Password
                              </Label>
                              <Input
                                id="current-password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password" className="text-slate-300">
                                New Password
                              </Label>
                              <Input
                                id="new-password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password" className="text-slate-300">
                                Confirm New Password
                              </Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                              />
                            </div>
                            <Button className="gradient-purple-blue gradient-purple-blue-hover">Update Password</Button>
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-slate-300">Authenticator App</div>
                              <div className="text-sm text-slate-400">
                                Use an authenticator app to generate one-time codes
                              </div>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-slate-300">SMS Authentication</div>
                              <div className="text-sm text-slate-400">
                                Receive a code via SMS to verify your identity
                              </div>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-500" />
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Sessions</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Current Session</div>
                                <div className="text-sm text-slate-400">
                                  <span className="text-green-400">Active now</span> • Chrome on Windows • San
                                  Francisco, USA
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400">Current</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Mobile App</div>
                                <div className="text-sm text-slate-400">
                                  Last active 2 days ago • iOS 16 • New York, USA
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                Revoke
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                          >
                            Sign Out All Other Sessions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Billing Settings */}
                  {profileTab === "billing" && (
                    <div className="space-y-6">
                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white">Billing Information</CardTitle>
                          <CardDescription className="text-slate-400">
                            Manage your billing details and payment methods
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-white">Current Plan</h3>
                              <Badge className="gradient-purple-blue text-white border-0">Pro</Badge>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-300">Plan</span>
                                <span className="font-medium text-white">Professional</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Billing Cycle</span>
                                <span className="font-medium text-white">Monthly</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Next Billing Date</span>
                                <span className="font-medium text-white">April 10, 2025</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Amount</span>
                                <span className="font-medium text-white">$29.00 / month</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              >
                                Change Plan
                              </Button>
                              <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                Cancel Subscription
                              </Button>
                            </div>
                          </div>

                          <Separator className="my-4 bg-slate-700" />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Payment Methods</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-14 rounded bg-slate-700 flex items-center justify-center">
                                    <CreditCardIcon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-white">•••• •••• •••• 4242</div>
                                    <div className="text-sm text-slate-400">Expires 04/25</div>
                                  </div>
                                </div>
                                <Badge className="bg-green-500/20 text-green-400">Default</Badge>
                              </div>
                              <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              >
                                <CreditCardIcon className="mr-2 h-4 w-4" />
                                Add Payment Method
                              </Button>
                            </div>
                          </div>

                          <Separator className="my-4 bg-slate-700" />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Billing Address</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="billing-name" className="text-slate-300">
                                  Full Name
                                </Label>
                                <Input
                                  id="billing-name"
                                  defaultValue="John Doe"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-company" className="text-slate-300">
                                  Company (Optional)
                                </Label>
                                <Input
                                  id="billing-company"
                                  placeholder="Your company name"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-address" className="text-slate-300">
                                  Address
                                </Label>
                                <Input
                                  id="billing-address"
                                  defaultValue="123 Main St"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-city" className="text-slate-300">
                                  City
                                </Label>
                                <Input
                                  id="billing-city"
                                  defaultValue="San Francisco"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-state" className="text-slate-300">
                                  State / Province
                                </Label>
                                <Input
                                  id="billing-state"
                                  defaultValue="California"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-zip" className="text-slate-300">
                                  ZIP / Postal Code
                                </Label>
                                <Input
                                  id="billing-zip"
                                  defaultValue="94103"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="billing-country" className="text-slate-300">
                                  Country
                                </Label>
                                <Select defaultValue="us">
                                  <SelectTrigger className="bg-[var(--bg-card)] border-slate-700 text-white focus:ring-purple-500">
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[var(--bg-card)] border-slate-700">
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                    <SelectItem value="fr">France</SelectItem>
                                    <SelectItem value="jp">Japan</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button className="gradient-purple-blue gradient-purple-blue-hover">
                              Save Billing Information
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-[var(--bg-card)] border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-white">Billing History</CardTitle>
                          <CardDescription className="text-slate-400">
                            View your past invoices and payment history
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              {
                                id: "INV-001",
                                date: "Mar 10, 2025",
                                amount: "$29.00",
                                status: "Paid",
                              },
                              {
                                id: "INV-002",
                                date: "Feb 10, 2025",
                                amount: "$29.00",
                                status: "Paid",
                              },
                              {
                                id: "INV-003",
                                date: "Jan 10, 2025",
                                amount: "$29.00",
                                status: "Paid",
                              },
                            ].map((invoice, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0"
                              >
                                <div className="flex items-center space-x-3">
                                  <Wallet className="h-5 w-5 text-slate-400" />
                                  <div>
                                    <div className="font-medium text-white">{invoice.id}</div>
                                    <div className="text-sm text-slate-400">{invoice.date}</div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="font-medium text-white">{invoice.amount}</div>
                                    <div className="text-sm text-green-400">{invoice.status}</div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                    Download
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Notification Settings */}
                  {profileTab === "notifications" && (
                    <Card className="bg-[var(--bg-card)] border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Notification Preferences</CardTitle>
                        <CardDescription className="text-slate-400">
                          Manage how and when you receive notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Billing and Invoices</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications about billing and invoices
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">System Updates</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications about system updates and maintenance
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">GPU Instance Alerts</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications about your GPU instances
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Marketing and Promotions</div>
                                <div className="text-sm text-slate-400">
                                  Receive marketing emails and special offers
                                </div>
                              </div>
                              <Switch className="data-[state=checked]:bg-purple-500" />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Push Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Instance Status Changes</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications when your instance status changes
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Usage Alerts</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications about usage thresholds
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <div className="text-slate-300">Security Alerts</div>
                                <div className="text-sm text-slate-400">
                                  Receive notifications about security events
                                </div>
                              </div>
                              <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4 bg-slate-700" />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Notification Delivery</h3>
                          <div className="space-y-3">
                            <RadioGroup defaultValue="all">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" className="text-purple-500" />
                                <Label htmlFor="all" className="text-slate-300">
                                  All notifications
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="important" id="important" className="text-purple-500" />
                                <Label htmlFor="important" className="text-slate-300">
                                  Important notifications only
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id="none" className="text-purple-500" />
                                <Label htmlFor="none" className="text-slate-300">
                                  No notifications
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="gradient-purple-blue gradient-purple-blue-hover">Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1 rounded-lg bg-slate-800/50 p-1">
              <Button
                variant={activeTab === "login" ? "default" : "ghost"}
                className={
                  activeTab === "login" ? "gradient-purple-blue text-white" : "text-slate-400 hover:text-white"
                }
                onClick={() => setActiveTab("login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                variant={activeTab === "register" ? "default" : "ghost"}
                className={
                  activeTab === "register" ? "gradient-purple-blue text-white" : "text-slate-400 hover:text-white"
                }
                onClick={() => setActiveTab("register")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
              <Button
                variant={activeTab === "account" ? "default" : "ghost"}
                className={
                  activeTab === "account" ? "gradient-purple-blue text-white" : "text-slate-400 hover:text-white"
                }
                onClick={() => setActiveTab("account")}
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

