const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');
  console.log("user ", socket.id);

  // Listen for new messages
  socket.on('chat message', (msg, name) => {
    console.log(name +' '+ msg);
    

    io.emit('chat message', msg, name);
  });
  socket.emit('message', "welcome to the group");

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
