require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

// CORS configuration
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	})
);

// Connect to MongoDB
mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

// WebSocket setup for live chat
io.on('connection', (socket) => {
	console.log('New client connected:', socket.id);

	// Handle incoming messages
	socket.on('message', (data) => {
		console.log('Message received:', data);
		// Broadcast message to all connected clients
		io.emit('message', data);
	});

	// Handle client disconnect
	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id);
	});
});

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
	console.error('Unhandled Rejection:', err);
});

// ===code3===
