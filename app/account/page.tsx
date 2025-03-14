"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  Loader2,
  AlertCircle,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams, useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AccountPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "login"
  const [activeTab, setActiveTab] = useState(initialTab)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [profileTab, setProfileTab] = useState("general")

  // Form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [company, setCompany] = useState("")
  const [timezone, setTimezone] = useState("utc-8")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Loading states
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Error states
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [profileError, setProfileError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const { user, session, isLoading, signIn, signUp, signOut } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Load user profile data when authenticated
  useEffect(() => {
    if (user && user.profile) {
      setFirstName(user.profile.firstName || "")
      setLastName(user.profile.lastName || "")
      setCompany(user.profile.company || "")
    }
  }, [user])

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab !== initialTab) {
      const url = new URL(window.location.href)
      if (activeTab === "login") {
        url.searchParams.delete("tab")
      } else {
        url.searchParams.set("tab", activeTab)
      }
      window.history.pushState({}, "", url.toString())
    }
  }, [activeTab, initialTab])

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setIsLoggingIn(true)

    try {
      await signIn(email, password)
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      })
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      setLoginError(error.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoggingIn(false)
    }
  }

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    if (!agreeToTerms) {
      setRegisterError("You must agree to the Terms of Service and Privacy Policy")
      return
    }

    if (registerPassword.length < 8) {
      setRegisterError("Password must be at least 8 characters long")
      return
    }

    setIsRegistering(true)

    try {
      await signUp(registerEmail, registerPassword, firstName, lastName)
      toast({
        title: "Success",
        description: "Registration successful! Please check your email to verify your account.",
      })
      router.push("/account/verify-email")
    } catch (error: any) {
      console.error("Registration error:", error)
      setRegisterError(error.message || "Failed to register. Please try again.")
    } finally {
      setIsRegistering(false)
    }
  }

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError("")
    setIsSavingProfile(true)

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          timezone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully",
      })
    } catch (error: any) {
      console.error("Profile update error:", error)
      setProfileError(error.message || "Failed to update profile. Please try again.")
    } finally {
      setIsSavingProfile(false)
    }
  }

  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long")
      return
    }

    setIsUpdatingPassword(true)

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update password")
      }

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      toast({
        title: "Success",
        description: "Your password has been updated successfully",
      })
    } catch (error: any) {
      console.error("Password update error:", error)
      setPasswordError(error.message || "Failed to update password. Please try again.")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      })
    } catch (error: any) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

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
                  {activeTab === "login" ? "Welcome Back" : "Join NexusHost"}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text">
                  {activeTab === "login" ? "Sign in to your account" : "Create your account"}
                </h1>
                <p className="text-lg text-slate-400 max-w-[600px]">
                  {activeTab === "login"
                    ? "Access your GPU instances, manage your account, and view your billing information."
                    : "Get started with NexusHost to deploy high-performance GPU instances for your workloads."}
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
                            disabled={isLoggingIn}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Continue with GitHub
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            disabled={isLoggingIn}
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

                        {loginError && (
                          <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{loginError}</AlertDescription>
                          </Alert>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoggingIn}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoggingIn}
                              />
                              <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                                disabled={isLoggingIn}
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
                              disabled={isLoggingIn}
                            />
                            <Label htmlFor="remember-me" className="text-sm text-slate-300">
                              Remember me
                            </Label>
                          </div>
                          <Button
                            type="submit"
                            className="w-full gradient-purple-blue gradient-purple-blue-hover"
                            disabled={isLoggingIn}
                          >
                            {isLoggingIn ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                              </>
                            ) : (
                              <>
                                <LogIn className="mr-2 h-4 w-4" />
                                Sign In
                              </>
                            )}
                          </Button>
                        </form>
                      </TabsContent>

                      {/* Register Form */}
                      <TabsContent value="register" className="mt-4 space-y-4">
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            disabled={isRegistering}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Sign up with GitHub
                          </Button>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            disabled={isRegistering}
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

                        {registerError && (
                          <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{registerError}</AlertDescription>
                          </Alert>
                        )}

                        <form onSubmit={handleRegister} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name" className="text-slate-300">
                                First name
                              </Label>
                              <Input
                                id="first-name"
                                placeholder="John"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={isRegistering}
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
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={isRegistering}
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
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required
                                disabled={isRegistering}
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
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                                disabled={isRegistering}
                              />
                              <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-400"
                                disabled={isRegistering}
                              >
                                {passwordVisible ? "Hide" : "Show"}
                              </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                              Password must be at least 8 characters long and include a number and a special character.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="terms"
                              className="data-[state=checked]:bg-purple-500"
                              checked={agreeToTerms}
                              onCheckedChange={setAgreeToTerms}
                              disabled={isRegistering}
                            />
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
                          <Button
                            type="submit"
                            className="w-full gradient-purple-blue gradient-purple-blue-hover"
                            disabled={isRegistering}
                          >
                            {isRegistering ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              <>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Account
                              </>
                            )}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardHeader>
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
                      <span className="text-white font-bold text-lg">
                        {user?.profile?.firstName?.charAt(0) || ""}
                        {user?.profile?.lastName?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </p>
                      <p className="text-sm text-slate-400">{user?.email}</p>
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
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={handleLogout}
                    >
                      <LogIn className="mr-2 h-4 w-4 rotate-180" />
                      Sign Out
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
                        {profileError && (
                          <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{profileError}</AlertDescription>
                          </Alert>
                        )}

                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                              <div className="relative h-20 w-20 rounded-full bg-linear-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">
                                  {user?.profile?.firstName?.charAt(0) || ""}
                                  {user?.profile?.lastName?.charAt(0) || "U"}
                                </span>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                  variant="outline"
                                  className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                                  disabled={isSavingProfile}
                                  type="button"
                                >
                                  Upload Photo
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="text-slate-400 hover:text-white"
                                  disabled={isSavingProfile}
                                  type="button"
                                >
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
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                  disabled={isSavingProfile}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="profile-last-name" className="text-slate-300">
                                  Last name
                                </Label>
                                <Input
                                  id="profile-last-name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                  disabled={isSavingProfile}
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
                                value={user?.email || ""}
                                className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                disabled
                              />
                              <p className="text-xs text-slate-400">
                                Email address cannot be changed. Contact support if you need to update your email.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="profile-company" className="text-slate-300">
                                Company (Optional)
                              </Label>
                              <Input
                                id="profile-company"
                                placeholder="Your company name"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                                disabled={isSavingProfile}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="profile-timezone" className="text-slate-300">
                                Timezone
                              </Label>
                              <Select value={timezone} onValueChange={setTimezone} disabled={isSavingProfile}>
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
                          <CardFooter className="flex justify-between px-0">
                            <Button
                              variant="ghost"
                              className="text-slate-400 hover:text-white"
                              type="button"
                              disabled={isSavingProfile}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="gradient-purple-blue gradient-purple-blue-hover"
                              type="submit"
                              disabled={isSavingProfile}
                            >
                              {isSavingProfile ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                "Save Changes"
                              )}
                            </Button>
                          </CardFooter>
                        </form>
                      </CardContent>
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

                          {passwordError && (
                            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{passwordError}</AlertDescription>
                            </Alert>
                          )}

                          <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password" className="text-slate-300">
                                Current Password
                              </Label>
                              <Input
                                id="current-password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                disabled={isUpdatingPassword}
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
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                disabled={isUpdatingPassword}
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={isUpdatingPassword}
                              />
                            </div>
                            <Button
                              className="gradient-purple-blue gradient-purple-blue-hover"
                              type="submit"
                              disabled={isUpdatingPassword}
                            >
                              {isUpdatingPassword ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                "Update Password"
                              )}
                            </Button>
                          </form>
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
                                  <span className="text-green-400">Active now</span> •{" "}
                                  {navigator.userAgent.includes("Chrome") ? "Chrome" : "Browser"} on{" "}
                                  {navigator.platform.includes("Win")
                                    ? "Windows"
                                    : navigator.platform.includes("Mac")
                                      ? "macOS"
                                      : navigator.platform.includes("Linux")
                                        ? "Linux"
                                        : "Unknown OS"}
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400">Current</Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                            onClick={handleLogout}
                          >
                            Sign Out All Sessions
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
                              <Badge className="gradient-purple-blue text-white border-0">Free</Badge>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-300">Plan</span>
                                <span className="font-medium text-white">Free Tier</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Features</span>
                                <span className="font-medium text-white">Basic access</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Limitations</span>
                                <span className="font-medium text-white">Limited resources</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Amount</span>
                                <span className="font-medium text-white">$0.00 / month</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                              >
                                Upgrade Plan
                              </Button>
                            </div>
                          </div>

                          <Separator className="my-4 bg-slate-700" />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white">Payment Methods</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-center bg-slate-800/50 rounded-lg p-6">
                                <div className="text-center">
                                  <CreditCardIcon className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                                  <p className="text-slate-300">No payment methods added yet</p>
                                  <p className="text-sm text-slate-400 mt-1">
                                    Add a payment method to upgrade your plan
                                  </p>
                                </div>
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
                                  defaultValue={`${firstName} ${lastName}`}
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
                                  defaultValue={company}
                                  className="bg-[var(--bg-card)] border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-address" className="text-slate-300">
                                  Address
                                </Label>
                                <Input
                                  id="billing-address"
                                  placeholder="123 Main St"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-city" className="text-slate-300">
                                  City
                                </Label>
                                <Input
                                  id="billing-city"
                                  placeholder="San Francisco"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-state" className="text-slate-300">
                                  State / Province
                                </Label>
                                <Input
                                  id="billing-state"
                                  placeholder="California"
                                  className="bg-[var(--bg-card)] border-slate-700 text-white focus-visible:ring-purple-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="billing-zip" className="text-slate-300">
                                  ZIP / Postal Code
                                </Label>
                                <Input
                                  id="billing-zip"
                                  placeholder="94103"
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
                          <div className="flex items-center justify-center bg-slate-800/50 rounded-lg p-6">
                            <div className="text-center">
                              <Wallet className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                              <p className="text-slate-300">No billing history yet</p>
                              <p className="text-sm text-slate-400 mt-1">
                                Your invoices will appear here once you upgrade to a paid plan
                              </p>
                            </div>
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

