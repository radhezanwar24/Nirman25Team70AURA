import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is authenticated (you'll need to implement your own auth check)
  const isAuthenticated = request.cookies.has("auth-token") // Example, replace with your actual auth check

  // List of paths that require authentication
  const authRequiredPaths = [
    "/messenger",
    "/dashboard/profile",
    "/dashboard/settings",
  ]

  // Public dashboard routes
  const publicPaths = [
    "/dashboard/jobs",
  ]

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Check if the current path is the new message page
  const isMessagePage = request.nextUrl.pathname === "/messenger/new-message-page";

  // If it's a public path or the message page, allow access
  if (isPublicPath || isMessagePage) {
    return NextResponse.next();
  }

  // Check if the current path requires authentication
  const requiresAuth = authRequiredPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // If path requires auth and user is not authenticated, redirect to login
  if (requiresAuth && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/messenger/:path*",
    "/dashboard/:path*",
  ],
}
