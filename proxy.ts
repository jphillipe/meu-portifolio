import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasAuthToken = request.cookies.has('ADMIN_AUTH')

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!hasAuthToken) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === '/admin/login' && hasAuthToken) {
    const dashboardUrl = new URL('/admin', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
