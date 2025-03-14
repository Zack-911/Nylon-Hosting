import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// List of public routes that don't require authentication
const publicRoutes = ["/", "/about", "/pricing", "/status", "/docs", "/support", "/account"]

// List of routes that should redirect to dashboard if already authenticated
const authRoutes = ["/account"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  // Check if the pathname starts with any of the public routes
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // Check if the pathname is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If the route is not public and user is not authenticated, redirect to login
  if (!isPublicRoute && !session) {
    url.pathname = "/account"
    return NextResponse.redirect(url)
  }

  // If user is authenticated and trying to access an auth route, redirect to dashboard
  if (session && isAuthRoute && pathname === "/account") {
    url.pathname = "/account"
    url.searchParams.set("tab", "account")
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

