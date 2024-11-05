// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Loader2 } from 'lucide-react';
// import io, { Socket } from 'socket.io-client';
// import { RootState } from '@/store/store';
// import { logout } from '@/store/auth-slice';

// interface ChatMessage {
// 	sender: string;
// 	content: string;
// 	timestamp: Date;
// }

// interface ChatSession {
// 	_id: string;
// 	visitorId: string;
// 	status: 'active' | 'waiting' | 'closed';
// 	visitorInfo: {
// 		name?: string;
// 		email?: string;
// 		pageUrl?: string;
// 	};
// 	messages: ChatMessage[];
// }

// const AgentDashboard = () => {
// 	const [sessions, setSessions] = useState<ChatSession[]>([]);
// 	const [activeChat, setActiveChat] = useState<string | null>(null);
// 	const [message, setMessage] = useState('');
// 	const [isOnline, setIsOnline] = useState(false);
// 	const [socket, setSocket] = useState<Socket | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);

// 	const dispatch = useDispatch();
// 	const router = useRouter();
// 	const { isAuthenticated, token, agent } = useSelector(
// 		(state: RootState) => state.auth
// 	);

// 	useEffect(() => {
// 		if (!isAuthenticated || !token) {
// 			router.push('/login');
// 		}
// 	}, [isAuthenticated, token, router]);

// 	useEffect(() => {
// 		if (!agent || !token) return;

// 		const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
// 			auth: { token },
// 			query: { agentId: agent.id },
// 		});

// 		setSocket(newSocket);
// 		setIsLoading(false);

// 		return () => {
// 			newSocket.close();
// 		};
// 	}, [agent, token]);

// 	useEffect(() => {
// 		if (!socket) return;

// 		socket.on('new:chat', (session: ChatSession) => {
// 			setSessions((prev) => [...prev, session]);
// 		});

// 		socket.on('message:new', ({ sessionId, message }) => {
// 			setSessions((prev) =>
// 				prev.map((session) => {
// 					if (session._id === sessionId) {
// 						return {
// 							...session,
// 							messages: [...session.messages, message],
// 						};
// 					}
// 					return session;
// 				})
// 			);
// 		});

// 		return () => {
// 			socket.off('new:chat');
// 			socket.off('message:new');
// 		};
// 	}, [socket]);

// 	const handleLogout = useCallback(() => {
// 		if (socket) {
// 			socket.disconnect();
// 		}
// 		dispatch(logout());
// 		router.push('/login');
// 	}, [dispatch, router, socket]);

// 	const toggleOnline = async () => {
// 		try {
// 			const newStatus = !isOnline;
// 			const response = await fetch('/api/agent/status', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 				body: JSON.stringify({ isOnline: newStatus }),
// 			});

// 			if (!response.ok) throw new Error('Failed to update status');

// 			setIsOnline(newStatus);
// 			if (socket) {
// 				socket.emit('agent:status', { isOnline: newStatus });
// 			}
// 		} catch (error) {
// 			console.error('Error updating status:', error);
// 		}
// 	};

// 	const handleAcceptChat = (sessionId: string) => {
// 		setActiveChat(sessionId);
// 		if (socket) {
// 			socket.emit('chat:accept', { sessionId });
// 		}
// 	};

// 	const sendMessage = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!message.trim() || !socket || !activeChat) return;

// 		const messageData = {
// 			sessionId: activeChat,
// 			content: message,
// 			sender: 'agent',
// 			timestamp: new Date(),
// 		};

// 		socket.emit('message:send', messageData);
// 		setMessage('');
// 	};

// 	if (isLoading) {
// 		return (
// 			<div className="h-screen flex items-center justify-center">
// 				<Loader2 className="h-8 w-8 animate-spin" />
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="flex h-screen p-4 gap-4">
// 			<div className="w-80 flex flex-col gap-4">
// 				<Card>
// 					<CardHeader>
// 						<div className="flex items-center justify-between">
// 							<CardTitle>Agent Dashboard</CardTitle>
// 							<div className="flex gap-2">
// 								<Button
// 									onClick={toggleOnline}
// 									variant={isOnline ? 'default' : 'secondary'}
// 									size="sm"
// 								>
// 									{isOnline ? 'Online' : 'Offline'}
// 								</Button>
// 								<Button onClick={handleLogout} variant="destructive" size="sm">
// 									Logout
// 								</Button>
// 							</div>
// 						</div>
// 					</CardHeader>
// 				</Card>

// 				<div className="flex-1 overflow-y-auto space-y-2">
// 					{sessions
// 						.filter((session) => session.status !== 'closed')
// 						.map((session) => (
// 							<Card
// 								key={session._id}
// 								className={`cursor-pointer transition-colors ${
// 									activeChat === session._id ? 'border-primary' : ''
// 								}`}
// 								onClick={() => handleAcceptChat(session._id)}
// 							>
// 								<CardContent className="p-4">
// 									<div className="flex justify-between items-center">
// 										<div>
// 											<p className="font-medium">
// 												{session.visitorInfo.name || 'Anonymous Visitor'}
// 											</p>
// 											<p className="text-sm text-muted-foreground">
// 												{session.status === 'waiting' ? 'Waiting...' : 'Active'}
// 											</p>
// 										</div>
// 										{session.status === 'waiting' && (
// 											<Button size="sm">Accept</Button>
// 										)}
// 									</div>
// 								</CardContent>
// 							</Card>
// 						))}
// 				</div>
// 			</div>

// 			{activeChat ? (
// 				<Card className="flex-1 flex flex-col">
// 					<CardHeader>
// 						<CardTitle>
// 							Chat with{' '}
// 							{sessions.find((s) => s._id === activeChat)?.visitorInfo.name ||
// 								'Visitor'}
// 						</CardTitle>
// 					</CardHeader>
// 					<CardContent className="flex-1 flex flex-col">
// 						<div className="flex-1 overflow-y-auto space-y-2 mb-4 p-4">
// 							{sessions
// 								.find((s) => s._id === activeChat)
// 								?.messages.map((msg, i) => (
// 									<div
// 										key={i}
// 										className={`p-3 rounded-lg max-w-[80%] ${
// 											msg.sender === 'agent'
// 												? 'ml-auto bg-primary text-primary-foreground'
// 												: 'bg-muted'
// 										}`}
// 									>
// 										<p>{msg.content}</p>
// 										<p className="text-xs opacity-70">
// 											{new Date(msg.timestamp).toLocaleTimeString()}
// 										</p>
// 									</div>
// 								))}
// 						</div>
// 						<form onSubmit={sendMessage} className="flex gap-2">
// 							<Input
// 								value={message}
// 								onChange={(e) => setMessage(e.target.value)}
// 								placeholder="Type your message..."
// 								className="flex-1"
// 							/>
// 							<Button type="submit" disabled={!message.trim()}>
// 								Send
// 							</Button>
// 						</form>
// 					</CardContent>
// 				</Card>
// 			) : (
// 				<Card className="flex-1 flex items-center justify-center text-muted-foreground">
// 					<p>Select a chat to start messaging</p>
// 				</Card>
// 			)}
// 		</div>
// 	);
// };

// export default AgentDashboard

'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectAuth } from '@/store/auth-slice';

const AgentDashboard = () => {
	const [agentData, setAgentData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const auth = useSelector(selectAuth);
	const router = useRouter();

	useEffect(() => {
		if (!auth.isAuthenticated) {
			router.push('/login');
			return;
		}

		const fetchAgentData = async () => {
			try {
				const data = await makeAuthenticatedRequest(
					`${process.env.NEXT_PUBLIC_API_URL}/api/agent-data`
				);
				setAgentData(data);
			} catch (err) {
				setError('Failed to fetch agent data');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchAgentData();
	}, [auth.isAuthenticated, router]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h1>Agent Dashboard</h1>
			{/* Render your agent dashboard content here using the agentData */}
		</div>
	);
};

export default AgentDashboard;
