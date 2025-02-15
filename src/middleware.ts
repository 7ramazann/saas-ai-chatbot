import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware()

export const config = {
  matcher: [
    // Apply middleware to all routes except static files and Next.js internals
    "/((?!_next|.*\\..*|api/auth).*)",
    "/api/(.*)",
    "/dashboard",
  ],
}
