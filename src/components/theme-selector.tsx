'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';

export function ThemeSelect() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={clsx(
						'flex h-[48px] items-center justify-start gap-2 rounded-[--radius] border border-border bg-background p-2 px-3 text-sm font-medium text-muted-foreground hover:bg-secondary/30 hover:text-card-foreground'
					)}
				>
					<Sun className="h-6 w-6 rotate-0 scale-100  dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0  dark:-rotate-0 dark:scale-100
           " />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
