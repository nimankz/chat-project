Real-Time Chat App
A simple real-time group chat application built with TypeScript, Next.js, Express, Socket.IO, and Mantine. Users can join a chat room, set a username, send messages, and see online users in a sidebar.
Features

Username Prompt: Users enter a username via a modal upon joining.
Real-Time Messaging: Messages are sent and received instantly via WebSocket.
Online Users: Displays a list of currently connected users.
Responsive UI: Clean, modern interface with readable fonts and chat bubble styling.
TypeScript: Type-safe code for better maintainability.

Tech Stack

Frontend: Next.js, TypeScript, Mantine, Socket.IO Client
Backend: Express, TypeScript, Socket.IO
Communication: WebSocket via Socket.IO

# Prerequisites

Node.js (v18 or higher)
npm or Yarn

# Setup:

## 1. Clone the Repository
```bash
    git clone <your-repo-url>
    cd chat-app
```
## 2. Backend Setup

Navigate to the backend directory (e.g., backend/):
```bash
    cd backend
    
```
Install dependencies:
```bash
    npm install
```


Start the backend server:
```bash
    npx ts-node server.ts
```

The server runs on http://localhost:3500.

## 3. Frontend Setup

Navigate to the frontend directory (e.g., frontend/):
```bash
    cd frontend
```
Install dependencies:
```bash
    npm install
```

Start the Next.js development server:
```bash
    npm run dev
```

The frontend runs on `http://localhost:3000`.
## 4. All in one(base on linux and mac)
if you want to run this project, you can run this code.

```bash
    sudo chmod +x run.sh
    ./run.sh
```
it will run both backend and frontend just in a command.
this project is not ready for deploy. if you want to deploy it, needs some changes.
## 4. Usage

- Open `http://localhost:3000` in multiple browser tabs.
- Enter a username in the modal to join the chat.
- Send messages via the input field or by pressing Enter.
- View messages and the online users list in real-time.

---

# Project Structure

- backend/: Express server with Socket.IO for WebSocket communication.
    - `src/server.ts`: Main server file handling connections, messages, and user tracking.


- frontend/: Next.js app with the chat UI.
    - `app/page.tsx`: Main chat interface with modal, message display, and online users sidebar.



## Dependencies

- Backend:
    - `express`, `socket.io`, `cors`
    - Dev: `@types/express`, `@types/cors`, `typescript`, `ts-node`


- Frontend:
    - `next`,`react`, `@mantine/core`, `@mantine/hooks`, `socket.io-client`
    - Dev: `@types/node`, `@types/react`, `typescript`



## Notes

The backend uses an in-memory store for usernames. For production, consider a database (e.g., MongoDB) or Redis.
Ensure CORS settings match the frontend URL (http://localhost:3000).
For better fonts, add Google Fonts (e.g., Inter) in frontend/app/layout.tsx.

Contributing
Feel free to submit issues or pull requests to improve the app.

