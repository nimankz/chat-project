import { Server, Socket } from 'socket.io';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Store usernames
const users: { [socketId: string]: string } = {};

const broadcastUserList = () => {
  const userList = Object.values(users).filter((username) => username);
  io.emit('userList', userList);
};

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle username setting
  socket.on('setUsername', (username: string) => {
    if (typeof username === 'string' && username.trim() !== '') {
      users[socket.id] = username.trim();
      console.log(`User ${socket.id} set username to ${username}`);
      broadcastUserList();
    }
  });

  // Handle messages
  socket.on('message', (data: string) => {
    if (typeof data !== 'string' || data.trim() === '') {
      console.log('Invalid message received');
      return;
    }
    console.log(`Server received: ${data}`);
    io.emit('message', data); // Broadcast as-is
    console.log(`Message sent: ${data}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User ${users[socket.id] || socket.id.substring(0, 5)} disconnected.`);
    delete users[socket.id];
    broadcastUserList();
  });
});