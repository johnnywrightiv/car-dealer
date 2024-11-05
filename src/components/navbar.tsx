'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { logout } from '@/server/actions/auth';
import { useSession } from 'next-auth/react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, LogOut, User, Eye, EyeOff } from 'lucide-react';

export function Navbar() {
	const { data: session } = useSession();
	const [isOnline, setIsOnline] = useState(true);

	return (
		<nav className="border-b bg-background w-full">
			<div className="max-w-screen-xl mx-auto px-4">
				<div className="flex items-center h-16">
					<div className="w-1/4">
						<Link className="font-bold" href="/">
							Home
						</Link>
					</div>
					<div className="w-1/2 flex items-center justify-center gap-x-5">
						<Link href="/chat">Chat</Link>
						<Link href="/agent">Agent</Link>
						<Link href="/middleware">Middleware</Link>
						<Link href="/server">Server</Link>
						<Link href="/api/data">API/Data</Link>
						<Link href="/api/chats">API/Chats</Link>
					</div>
					<div className="w-1/4 flex justify-end">
						{!session?.user ? (
							<Button asChild>
								<Link href="/login">Login</Link>
							</Button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="flex items-center gap-x-2 px-2 py-1 h-auto"
									>
										<span className="text-sm truncate max-w-[100px]">
											{session.user.name || session.user.email}
										</span>
										<div className="relative flex-shrink-0">
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={session.user.image || undefined}
													alt="User Avatar"
												/>
												<AvatarFallback>
													<User className="h-4 w-4" />
												</AvatarFallback>
											</Avatar>
											<span
												className={`absolute top-0 right-0 h-2 w-2 rounded-full ${
													isOnline ? 'bg-success' : 'bg-destructive'
												}`}
											/>
										</div>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => setIsOnline(!isOnline)}>
										{isOnline ? (
											<EyeOff className="mr-2 h-4 w-4" />
										) : (
											<Eye className="mr-2 h-4 w-4" />
										)}
										Set {isOnline ? 'Offline' : 'Online'}
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/settings" className="flex w-full items-center">
											<Settings className="mr-2 h-4 w-4" />
											<span>Settings</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => logout()}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
