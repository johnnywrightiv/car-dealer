import { auth } from '@/server/auth';
import { NextResponse } from 'next/server';

export const GET = auth(function GET(req) {
	if (!req.auth) {
		return NextResponse.json({ message: 'Not Authenticated' }, { status: 401 });
	}
	// Fetch and return open chats
	return NextResponse.json({ chats: [] });
});
