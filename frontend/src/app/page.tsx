'use client';

import { useState, useEffect } from 'react';
import { TextInput, Button, Container, Text, Box, Modal, Group, Paper, Stack, Flex, Center } from '@mantine/core';
import { io, Socket } from 'socket.io-client';


export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3500', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('message', (data: string) => {
      console.log(`Client received: ${data}`);
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });

    // Handle online users updates from backend
    newSocket.on('userList', (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle username submission
  const handleUsernameSubmit = () => {
    if (usernameInput.trim() !== '') {
      setUsername(usernameInput.trim());
      setIsModalOpen(false);
      if (socket) {
        socket.emit('setUsername', usernameInput.trim());
      }
    }
  };

  // Handle sending messages
  const sendMessage = () => {
    if (socket && message.trim() !== '' && username) {
      socket.emit('message', `${username}: ${message.trim()}`);
      setMessage('');
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message.trim() !== '' && username) {
      sendMessage();
    }
  };

  return (
    <>
      {/* Username Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => {}} // Prevent closing by clicking outside
        title={<Text size="xl" fw={700} ta="center">Welcome! Enter Your Username</Text>}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        centered
        size="md"
        padding="lg"
        overlayProps={{ opacity: 0.6, blur: 3 }}
        transitionProps={{ transition: 'fade', duration: 300 }}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',gap:"20px", height:'25%' }}
      >
        <TextInput
          placeholder="Your username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.currentTarget.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
          autoFocus
          styles={{
            input: {
              fontSize: '16px',
              height: '48px',
              fontFamily: "'Inter', Arial, sans-serif",
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            },
          }}
        />
          <Button
            onClick={handleUsernameSubmit}
            disabled={!usernameInput.trim()}
            size="md"
            variant="filled"
            color="blue"
            style={{ marginTop: '20px' }}
          >
            Join Chat
          </Button>
      </Modal>

      {/* Chat Interface */}
      <Box
        ta="center"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f4f7fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Inter', Arial, sans-serif",
        }}
      >
        <Container
          size="lg"
          style={{
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '95%',
            maxWidth: '800px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            height: '85vh',
            overflow: 'hidden',
          }}
        >
          {/* Online Users Sidebar */}
          <Paper
            style={{
              width: '200px',
              backgroundColor: '#f9f9f9',
              borderRight: '1px solid #e0e0e0',
              padding: '20px',
              overflowY: 'auto',
            }}
          >
            <Text size="lg" fw={600} ta="center" mb="20px" c="#333">
              Online Users
            </Text>
            <Stack gap="10px">
              {onlineUsers.length === 0 ? (
                <Text size="sm" c="#666" ta="center">
                  No users online
                </Text>
              ) : (
                onlineUsers.map((user, i) => (
                  <Text key={i} size="sm" c="#333">
                    {user}
                  </Text>
                ))
              )}
            </Stack>
          </Paper>

          {/* Chat Area */}
          <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <Text
              size="xl"
              fw={700}
              ta="center"
              style={{
                color: '#1a1a1a',
                marginBottom: '20px',
                fontSize: '32px',
              }}
            >
              Chat Room
            </Text>

            <Box
              style={{
                flex: 1,
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                padding: '20px',
                overflowY: 'auto',
                marginBottom: '20px',
                border: '1px solid #e0e0e0',
              }}
            >
              {messages.map((msg, i) => (
                <Text
                  key={i}
                  style={{
                    margin: '10px 0',
                    padding: '12px 16px',
                    backgroundColor: msg.startsWith(`${username}:`) ? '#e3f2fd' : '#ffffff',
                    borderRadius: '10px',
                    textAlign: msg.startsWith(`${username}:`) ? 'right' : 'left',
                    maxWidth: '70%',
                    marginLeft: msg.startsWith(`${username}:`) ? 'auto' : '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    color: '#1a1a1a',
                    lineHeight: '1.5',
                  }}
                >
                  {msg}
                </Text>
              ))}
            </Box>

            <Group grow>
              <TextInput
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                disabled={!username}
                ta={Center}
                styles={{
                  input: {
                    backgroundColor: '#fff',
                    height: '48px',
                    borderRadius: '10px',
                    color: '#1a1a1a',
                    fontSize: '16px',
                    textAlign: 'center',
                  },
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={!username || !message.trim()}
                radius="md"
                style={{ height: '48px', width: '100px', backgroundColor: '#00B5FF', color: 'white', textColor: 'white' }}
                size="md"
              >
                Send
              </Button>
            </Group>
          </Box>
        </Container>
      </Box>
    </>
  );
}