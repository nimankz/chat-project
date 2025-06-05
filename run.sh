killall node 2>/dev/null
#!/bin/bash
cd frontend/
npm run dev &
cd ../backend/
npm start &
cd ../
echo "Frontend and Backend servers are running."
echo "To stop the servers, use 'killall node' or 'pkill -f node'."
wait
echo "Servers have stopped."
exit 0


# This script starts both the frontend and backend servers in the background.