'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Chat from '@/components/chat-window';
import { UserCircle } from 'lucide-react';

interface ChatSession {
	_id: string;
	visitorName: string;
	status: 'active' | 'waiting';
	lastMessage: string;
}

// Mock data for demonstration
const mockSessions: ChatSession[] = [
	{
		_id: '1',
		visitorName: 'John Doe',
		status: 'active',
		lastMessage: 'Hello, I need help with my order.',
	},
	{
		_id: '2',
		visitorName: 'Jane Smith',
		status: 'waiting',
		lastMessage: 'Is anyone available?',
	},
	{
		_id: '3',
		visitorName: 'Anonymous Visitor',
		status: 'active',
		lastMessage: 'How do I reset my password?',
	},
];

export default function AgentDashboard() {
	const [sessions, setSessions] = useState<ChatSession[]>(mockSessions);
	const [activeChat, setActiveChat] = useState<string | null>(null);

	const handleJoinChat = (sessionId: string) => {
		setActiveChat(sessionId);
		// Update the session status to 'active' when joined
		setSessions((prevSessions) =>
			prevSessions.map((session) =>
				session._id === sessionId ? { ...session, status: 'active' } : session
			)
		);
	};

	return (
		<div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
			<Card className="lg:w-1/3 xl:w-1/4">
				<CardHeader>
					<CardTitle>Active Chats</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[calc(100vh-12rem)]">
						{sessions.map((session) => (
							<Button
								key={session._id}
								variant={activeChat === session._id ? 'default' : 'outline'}
								className="w-full justify-start mb-2 p-3 h-auto"
								onClick={() => handleJoinChat(session._id)}
							>
								<div className="flex items-center w-full">
									<UserCircle className="mr-2 h-6 w-6" />
									<div className="flex flex-col items-start">
										<div className="flex items-center">
											<span className="font-medium mr-2">
												{session.visitorName}
											</span>
											<Badge
												variant={
													session.status === 'waiting'
														? 'destructive'
														: 'secondary'
												}
											>
												{session.status}
											</Badge>
										</div>
										<p className="text-sm text-muted-foreground text-left truncate w-full">
											{session.lastMessage}
										</p>
									</div>
								</div>
							</Button>
						))}
					</ScrollArea>
				</CardContent>
			</Card>

			<Card className="flex-1">
				<CardContent className="p-0">
					{activeChat ? (
						<Chat sessionId={activeChat} />
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							Select a chat to join
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
