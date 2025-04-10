"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeDebugger() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Theme Debug"}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-16 right-4 z-50 w-80">
          <CardHeader>
            <CardTitle>Theme Debugger</CardTitle>
            <CardDescription>Diagnose theme switching issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Current Theme:</span>
                <span className="font-mono">{theme || "undefined"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Resolved Theme:</span>
                <span className="font-mono">{resolvedTheme || "undefined"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>System Theme:</span>
                <span className="font-mono">{systemTheme || "undefined"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Theme Variables:</div>
              <div className="rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-background"></div>
                  <span className="text-xs">Background</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-card"></div>
                  <span className="text-xs">Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                  <span className="text-xs">Primary</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Quick Actions:</div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setTheme("light")}>
                  Light
                </Button>
                <Button size="sm" variant="outline" onClick={() => setTheme("dark")}>
                  Dark
                </Button>
                <Button size="sm" variant="outline" onClick={() => setTheme("system")}>
                  System
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Status:</div>
              <div className="rounded-md border p-2">
                {theme === resolvedTheme ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs">Theme is working correctly</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Theme mismatch detected</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
