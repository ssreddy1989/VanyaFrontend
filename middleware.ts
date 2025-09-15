// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Allow requests only if they are going to our backend domain (ngrok/Vercel)
export function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Allow all Next.js internal assets, static files, and API routes
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/images")
  ) {
    return NextResponse.next()
  }

  // Get allowed backend URL from environment
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

  if (!backendUrl) {
    console.warn("⚠️ NEXT_PUBLIC_MEDUSA_BACKEND_URL is not set")
    return NextResponse.next()
  }

  try {
    const backendHost = new URL(backendUrl).hostname
    const reqHost = req.headers.get("host")

    // Block requests from unexpected hosts
    if (reqHost && reqHost !== backendHost && !reqHost.endsWith(".vercel.app")) {
      return new NextResponse(
        JSON.stringify({
          error: "Blocked request",
          message: `Host (${reqHost}) is not allowed. Allowed: ${backendHost}`,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }
  } catch (err) {
    console.error("Invalid NEXT_PUBLIC_MEDUSA_BACKEND_URL:", err)
  }

  return NextResponse.next()
}

// Specify which routes middleware should run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}