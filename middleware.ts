import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Always allow request, don’t block anything
  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
