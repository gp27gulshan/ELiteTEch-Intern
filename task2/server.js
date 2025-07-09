// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (adjust in production)
    methods: ['GET', 'POST']
  }
});

app.use(cors());

// Serve a simple homepage (optional)
app.get('/', (req, res) => {
  res.send('Chat server is running...');
});

// Handle socket connection
io.on('connection', (socket) => {
  console.log('🟢 A user connected');

  socket.on('chatMessage', (data) => {
    io.emit('message', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
