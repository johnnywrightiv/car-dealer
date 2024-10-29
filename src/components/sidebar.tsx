'use client';

import * as React from 'react';
import SearchForm from '@/components/search-form';

export function Sidebar() {
	return (
		<aside className="w-72 h-full border-r bg-background p-6">
			<nav className="grid gap-2">
				<SearchForm />
			</nav>
		</aside>
	);
}
