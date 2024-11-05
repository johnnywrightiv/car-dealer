import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.headers.get('Authorization')?.split(' ')[1];

	if (!token && request.nextUrl.pathname.startsWith('/agent')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/agent/:path*',
};
