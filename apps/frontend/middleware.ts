// apps/frontend/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Esta es la función requerida
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// ✅ Este es el matcher opcional, que ya tienes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
