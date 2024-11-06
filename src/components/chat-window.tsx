'use client';

import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addMessage, addSession, updateSession } from '@/store/chat-slice';
import type { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, MessageCircle } from 'lucide-react';

if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
	throw new Error('NEXT_PUBLIC_SOCKET_URL is not defined');
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
	autoConnect: false,
});

const validateEmail = (email: string): boolean => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

const formatPhoneNumber = (phoneNumber: string): string => {
	const cleaned = phoneNumber.replace(/\D/g, '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return `${match[1]}-${match[2]}-${match[3]}`;
	}
	return phoneNumber;
};

export default function PersistentChatWindow() {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const [visitorName, setVisitorName] = useState('');
	const [visitorEmail, setVisitorEmail] = useState('');
	const [visitorPhone, setVisitorPhone] = useState('');
	const [chatStarted, setChatStarted] = useState(false);
	const [connected, setConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const chatSessions = useSelector((state: RootState) => state.chat.sessions);
	const currentSession = useSelector((state: RootState) =>
		sessionId ? chatSessions.find((session) => session.id === sessionId) : null
	);

	useEffect(() => {
		const connectWithRetry = () => {
			console.log('Attempting to connect to socket server...');
			socket.connect();

			socket.on('connect', () => {
				console.log('Socket connected successfully');
				setConnected(true);
				setError(null);
				setRetryCount(0);
			});

			socket.on('connect_error', (err) => {
				console.error('Connection error:', err);
				setError('Failed to connect to chat server');
				setConnected(false);

				if (retryCount < 5) {
					setRetryCount((prev) => prev + 1);
					setTimeout(connectWithRetry, 3000);
				}
			});

			socket.on('message', (data: { sessionId: string; message: any }) => {
				console.log('Received message:', data);
				dispatch(addMessage(data));
			});

			socket.on('session_created', (session) => {
				console.log('Session created:', session);
				dispatch(addSession(session));
				setSessionId(session.id);
				setChatStarted(true);
			});

			socket.on('session_updated', (session) => {
				console.log('Session updated:', session);
				dispatch(updateSession(session));
			});

			return () => {
				socket.off('connect');
				socket.off('connect_error');
				socket.off('message');
				socket.off('session_created');
				socket.off('session_updated');
			};
		};

		if (!connected && chatStarted) {
			connectWithRetry();
		}

		return () => {
			if (connected) {
				socket.disconnect();
			}
		};
	}, [chatStarted, retryCount, dispatch, connected]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentSession?.messages]);

	const startChat = async (e: React.FormEvent) => {
		e.preventDefault();
		if (visitorName.trim() && validateEmail(visitorEmail)) {
			if (!connected) {
				socket.connect();
			}
			const formattedPhone = formatPhoneNumber(visitorPhone);
			socket.emit('start_chat', {
				visitorName,
				visitorEmail,
				visitorPhone: formattedPhone,
			});
			console.log('Emitted start_chat event');
			setChatStarted(true);
		} else {
			setError('Please enter a valid name and email address.');
		}
	};

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() && sessionId && currentSession) {
			const newMessage = {
				sessionId: sessionId,
				message: {
					content: message,
					senderId: currentSession.email, // Use email as senderId
					isAgent: false,
				},
			};
			socket.emit('message', newMessage);
			dispatch(addMessage(newMessage));
			setMessage('');
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-4 right-4 rounded-full w-12 h-12 flex items-center justify-center"
			>
				<MessageCircle />
			</Button>
			{isOpen && (
				<div className="fixed bottom-20 right-4 w-80 bg-background border border-border shadow-lg rounded-lg overflow-hidden">
					<div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
						<h2 className="text-lg font-semibold">Chat</h2>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="p-4">
						{!chatStarted ? (
							<form onSubmit={startChat} className="space-y-4">
								<Input
									type="text"
									value={visitorName}
									onChange={(e) => setVisitorName(e.target.value)}
									placeholder="Enter your name"
									required
								/>
								<Input
									type="email"
									value={visitorEmail}
									onChange={(e) => setVisitorEmail(e.target.value)}
									placeholder="Enter your email"
									required
								/>
								<Input
									type="tel"
									value={visitorPhone}
									onChange={(e) =>
										setVisitorPhone(formatPhoneNumber(e.target.value))
									}
									placeholder="Enter your phone number (optional)"
								/>
								<Button type="submit" className="w-full">
									Start Chat
								</Button>
								{error && <div className="text-red-500 text-sm">{error}</div>}
							</form>
						) : (
							<div className="space-y-4">
								{error ? (
									<div className="text-red-500">{error}</div>
								) : connected ? (
									<div className="text-green-500">Connected to chat server</div>
								) : (
									<div className="text-yellow-500">
										Connecting to chat server...
									</div>
								)}
								<div className="h-[300px] overflow-y-auto p-4 bg-secondary rounded">
									{currentSession?.messages?.map((msg: any, i: number) => (
										<div
											key={i}
											className={`mb-2 p-2 rounded ${
												msg.isAgent ? 'bg-primary/30' : 'bg-background ml-auto'
											}`}
										>
											<div className="text-sm text-muted-foreground">
												{msg.isAgent ? 'Agent' : currentSession.visitor}
											</div>
											{msg.content}
										</div>
									))}
									<div ref={messagesEndRef} />
								</div>
								<form onSubmit={sendMessage} className="flex gap-2">
									<Input
										type="text"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Type a message..."
										disabled={!connected}
									/>
									<Button type="submit" disabled={!connected}>
										Send
									</Button>
								</form>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
