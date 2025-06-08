//session 1
// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         console.log(`Received from client: ${message}`);
//         ws.send(`${message}`);
//     });
// });

// console.log('WebSocket server running on ws://localhost:8080');
// =================================================

import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors'
import path from 'path';
import  {fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500
const app = express()
app.use(cors({
    origin : [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
    ],
    credentials: true
}))

app.use(express.static(path.join(__dirname,"public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer,{
    cors:{
        origin:[
         'http://localhost:3000',
      'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST'],
    credentials: true
}
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
    socket.on('message', (data) => {
        console.log(`server received: ${data}`);
        socket.emit('message',`${socket.id.substring(0,5)}: ${data}`)
    });
});

