import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password"];
  const protectedRoutes = ["/home", "/settings"];

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.png (public images)
     * - hero.png (public images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|hero.png).*)",
  ],
};
