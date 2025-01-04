import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isLoggedIn } from './services/authService';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const response = isLoggedIn(token as unknown as string);
  if (!response) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register') ||
                     request.nextUrl.pathname.startsWith('/forgot-password');
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
}; 