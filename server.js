const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');
const cors = require('cors'); // Add this line

const app = express();

const corsOptions = {
  origin: '*, http://localhost:8001', // Replace with your Vue.js frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server);

const redisClient = redis.createClient();

redisClient.subscribe('app-notifications');

redisClient.on('message', (channel, message) => {
  io.emit('update', JSON.parse(message));
});

const port = 3005;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
