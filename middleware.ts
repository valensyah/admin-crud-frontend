import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')
  console.log(cookie)
  if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/category', '/profile', '/transaction'],
}