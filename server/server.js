require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const socketHandler = require('./socket/socketHandler');

const app = express();

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: 'https://task-management-hzsq.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: 'https://task-management-hzsq.vercel.app',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Socket.io handler
socketHandler(io);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
