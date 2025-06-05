"use client";

import { useState } from 'react';
import { TextInput, Button, Container, Text, Box, Center } from '@mantine/core';
import { text } from 'stream/consumers';

export default function Home() {
    const [message, setMessage] = useState('');
    const ws = new WebSocket('ws://localhost:8080');

    const sendMessage = () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    };

    return (
      
        <html>
          <head>
            <title>WebSocket Client</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
            <Box ta={Center} style={{ width: '70%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container size="xs" style={{ padding: '40px', textAlign: 'center', margin: '70px', backgroundColor: '#f0f0f0', borderRadius: '8px', width: '75%', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', height:'75%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"black", fontSize:"40px", marginBottom: '30px'}}>WebSocket Client</Text>
            <TextInput style={{ backgroundColor: '#fff', color: '#000', height:'50px', width:'50%', textAlign:'center', borderRadius:'10px', marginBottom: '20px' }}
                placeholder="Type a message"
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                styles={{ input: {backgroundColor: '#fff' ,height: '50px', width: '100%', textAlign: 'center', borderRadius: '10px' } }}
            />
            <Button onClick={sendMessage} color="gray" size='md' style={{padding:'10px', width:'50%'}} radius="md" variant="filled">
                Send Message
            </Button>
        </Container>
        </Box>
          </body>
        </html>
        
    );
}
