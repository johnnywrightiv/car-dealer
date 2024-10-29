import React from 'react';
import { Button } from '@/components/ui/button';

export function BottomBar() {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-center">
			<Button variant="secondary" className="mx-auto">
				Contact Us
			</Button>
		</div>
	);
}
