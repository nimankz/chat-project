"use client";

import { useState } from 'react';
import { TextInput, Button, Container, Text, Box, Center, Textarea, Flex } from '@mantine/core';

export default function Home() {
    const [message, setMessage] = useState('');
    const ws = new WebSocket('ws://localhost:8080');
    const text = document.getElementById('textArea');

    function sendMessage() {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);}
        else {
            console.error('WebSocket is not open. Ready state:', ws.readyState);
        }
    };
    function handleMessage(event: MessageEvent) {
        console.log('Message from server:', event.data);
        if (text) {
            text.textContent += `\n${event.data}`;
            text.innerHTML = text.innerHTML.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML display
        } else {
            console.error('Text area not found');
        }
    }
    ws.onmessage = handleMessage;

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
            <TextInput style={{ backgroundColor: '#fff', color: 'black', height:'50px', width:'50%', textAlign:'center', borderRadius:'10px', marginBottom: '20px' }}
                placeholder="Type a message"
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                styles={{ input: {backgroundColor: '#fff' ,height: '50px', width: '100%', textAlign: 'center', borderRadius: '10px', color: "black" } }}
            />
            <Button onClick={sendMessage} color="gray" size='md' style={{padding:'10px', width:'50%'}} radius="md" variant="filled">
                Send Message
            </Button>
            <ul id='textArea' style={{ marginTop: '20px', backgroundColor: '#fff', color: 'black', width: '100%', height: '200px', borderRadius: '10px', display:'Flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>                
            </ul>
        </Container>
        </Box>
          </body>
        </html>
        
    );
}
