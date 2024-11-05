require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ['GET', 'POST', 'OPTIONS'],
		credentials: true,
	})
);
app.use(express.json());

// Add OPTIONS handler for preflight requests
app.options('*', cors());

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	})
);

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

app.post('/auth/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ id: user._id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);
		res.json({ token, user: { id: user._id, username: user.username } });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error during login' });
	}
});

app.get('/api/user', authenticateToken, (req, res) => {
	res.json({ user: req.user });
});

app.get('/api/agent-data', authenticateToken, async (req, res) => {
	try {
		// Fetch and return agent-specific data here
		// For example:
		const agentData = {
			name: req.user.username,
			// Add other relevant data
		};
		res.json(agentData);
	} catch (error) {
		console.error('Error fetching agent data:', error);
		res.status(500).json({ message: 'Server error while fetching agent data' });
	}
});

io.on('connection', (socket) => {
	console.log('Client connected:', socket.id);

	socket.on('disconnect', () => {
		console.log('Client disconnected:', socket.id);
	});

	socket.on('message', (data) => {
		io.emit('message', data);
		console.log('Message received:', data);
	});
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.error('Unhandled Rejection:', err);
});
