'use client';

import * as React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import SearchForm from '@/components/search-form';

export function FilterButton() {
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	return (
		<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					size="lg"
					className="lg:w-auto w-full flex items-center justify-center gap-2"
				>
					<Filter className="h-4 w-4" />
					Filter
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Filters</DrawerTitle>
				</DrawerHeader>
				<div className="p-4 pb-0">
					<SearchForm />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
