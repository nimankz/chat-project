// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received from client: ${message}`);
        ws.send(`${message}`);
    });
});

console.log('WebSocket server running on ws://localhost:8080');
