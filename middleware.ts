import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes (require authentication)
const protectedRoutes = [
  '/dashboard',
  '/dashboard/retailer',
  '/dashboard/supplier',
];

// Define auth routes (should redirect to dashboard if already logged in)
const authRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/signup/retailer',
  '/auth/signup/supplier',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for all possible session token variations
  const sessionToken = request.cookies.get('next-auth.session-token') ||
                       request.cookies.get('__Secure-next-auth.session-token') ||
                       request.cookies.get('next-auth.session-token.0') ||
                       request.cookies.get('__Host-next-auth.session-token');

  // Also check for NextAuth callback session
  const callbackSession = request.cookies.get('next-auth.callback-url') ||
                          request.cookies.get('__Secure-next-auth.callback-url');

  const isLoggedIn = !!(sessionToken?.value);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Skip auth route redirects - let NextAuth and client-side handle them
  // This prevents conflicts with NextAuth's internal redirects

  // If user is not logged in and trying to access protected routes, redirect to signin
  if (!isLoggedIn && isProtectedRoute) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
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
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|logo|privatelabel-products|hero-section|private-label).*)',
  ],
};
