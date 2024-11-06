require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	})
);

mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

io.on('connection', async (socket) => {
	console.log('New client connected:', socket.id);

	// Handle starting a new chat
	socket.on('start_chat', async (data) => {
		try {
			console.log('Starting new chat for visitor:', data.visitorName);

			// Create new chat session in database
			const session = await prisma.chatSession.create({
				data: {
					visitor: data.visitorName,
					email: data.visitorEmail,
					phone: data.visitorPhone,
					status: 'WAITING',
				},
				include: {
					messages: true,
				},
			});

			// Join the socket to a room with the session ID
			socket.join(session.id);

			// Emit the session back to the client
			socket.emit('session_created', session);

			// Broadcast to all agents that a new session is available
			socket.broadcast.emit('session_updated', session);

			console.log('Chat session created:', session.id);
		} catch (error) {
			console.error('Error creating chat session:', error);
			socket.emit('error', 'Failed to create chat session');
		}
	});

	// Handle messages
	socket.on('message', async (data) => {
		try {
			const { sessionId, message } = data;
			const { content, senderId, isAgent } = message;
			console.log('Message received for session:', sessionId);

			// Save message to database
			const savedMessage = await prisma.message.create({
				data: {
					content,
					senderId,
					isAgent,
					chatSession: {
						connect: {
							id: sessionId,
						},
					},
				},
			});

			// Fetch the chat session to get the visitor's name
			const chatSession = await prisma.chatSession.findUnique({
				where: { id: sessionId },
			});

			// Broadcast message to everyone in the session room
			io.to(sessionId).emit('message', {
				sessionId,
				message: {
					id: savedMessage.id,
					content: savedMessage.content,
					senderId: savedMessage.senderId,
					isAgent: savedMessage.isAgent,
					createdAt: savedMessage.createdAt,
					visitorName: chatSession.visitor,
				},
			});
		} catch (error) {
			console.error('Error handling message:', error);
			socket.emit('error', 'Failed to send message');
		}
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id);
	});
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.error('Unhandled Rejection:', err);
});
