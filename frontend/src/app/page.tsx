// "use client";

// import { useState, useEffect } from 'react';
// import { TextInput, Button, Container, Text, Box, Center } from '@mantine/core';
// import io from 'socket.io-client';
// export default function Home() {
//     const [message, setMessage] = useState(''); 
//     const [socket, setSocket] = useState<any>(null);


//     useEffect(() => {
//     const newSocket = io("http://localhost:3500");
//     setSocket(newSocket);

//     // Only run on the client after mount
//     const textField = document.getElementById('myList') as HTMLUListElement | null;
//     console.log('UL element:', textField);

//     return () => { newSocket.disconnect(); };
//   }, []);
//     function sendMessage() {
//         socket.emit('message', message);
//     };
//     socket.on('message', (data:string) => {
//         console.log(`client received: ${data}`); 
//         if (textField) {
//             const newMessage = document.createElement('li');
//             newMessage.textContent = data;
//             textField.appendChild(newMessage);
//         }
//     });

//     return (
      
//         <html>
//           <head>
//             <title>WebSocket Client</title>
//             <meta name="viewport" content="width=device-width, initial-scale=1" />
//           </head>
//           <body style={{ backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
//             <Box ta={Center} style={{ width: '70%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Container size="xs" style={{ padding: '40px', textAlign: 'center', margin: '70px', backgroundColor: '#f0f0f0', borderRadius: '8px', width: '75%', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', height:'75%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <Text style={{color:"black", fontSize:"40px", marginBottom: '30px'}}>WebSocket Client</Text>
//             <TextInput style={{ backgroundColor: '#fff', color: 'black', height:'50px', width:'50%', textAlign:'center', borderRadius:'10px', marginBottom: '20px' }}
//                 placeholder="Type a message"
//                 value={message} 
//                 onChange={(e) => setMessage(e.target.value)} 
//                 styles={{ input: {backgroundColor: '#fff' ,height: '50px', width: '100%', textAlign: 'center', borderRadius: '10px', color: "black" } }}
//             />
//             <Button onClick={sendMessage} color="gray" size='md' style={{padding:'10px', width:'50%'}} radius="md" variant="filled">
//                 Send Message
//             </Button>
//             <ul id='myList' style={{ marginTop: '20px', backgroundColor: '#fff', color: 'black', width: '100%', height: '200px', borderRadius: '10px', display:'Flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>                
//             </ul>
//         </Container>
//         </Box>
//           </body>
//         </html>
        
//     );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { TextInput, Button, Container, Text, Box, Center } from '@mantine/core';
import io from 'socket.io-client';

export default function Home() {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3500', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('message', (data: string) => {
      console.log(`client received: ${data}`);
      if (listRef.current) {
        const newMessage = document.createElement('li');
        newMessage.textContent = data;
        listRef.current.appendChild(newMessage);
      }
    });

    return () =>{ newSocket.disconnect()};
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <Box
      ta={Center}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        size="xs"
        style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          width: '70%',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          height: '75%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'black', fontSize: '40px', marginBottom: '30px' }}>
          WebSocket Client
        </Text>

        <TextInput
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          styles={{
            input: {
              backgroundColor: '#fff',
              height: '50px',
              width: '100%',
              textAlign: 'center',
              borderRadius: '10px',
              color: 'black',
            },
          }}
          style={{
            backgroundColor: '#fff',
            color: 'black',
            height: '50px',
            width: '50%',
            textAlign: 'center',
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />

        <Button
          onClick={sendMessage}
          color="gray"
          size="md"
          style={{ padding: '10px', width: '50%' }}
          radius="md"
          variant="filled"
        >
          Send Message
        </Button>

        <ul
          ref={listRef}
          style={{
            marginTop: '20px',
            backgroundColor: '#fff',
            color: 'black',
            width: '100%',
            height: '200px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '10px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        ></ul>
      </Container>
    </Box>
  );
}
