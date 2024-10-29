import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFound = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h1>404 Page Not Found</h1>
			<nav className="mb-8 flex justify-end">
				<Button variant="ghost" asChild>
					<Link href="/">Back to Home</Link>
				</Button>
			</nav>
		</div>
	);
};

export default NotFound;
