import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get your auth token (adjust cookie name to match yours)
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value;

  const isAuthenticated = !!token;
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Optional: pass the intended destination so you can redirect after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};