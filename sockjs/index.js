const express = require('express');
const http = require('http');
const sockjs = require('sockjs');

const app = express();
const port = 3000;

// Create an HTTP server
const server = http.createServer(app);

// Create a SockJS server
const echo = sockjs.createServer();

// Define the behavior of the SockJS server
echo.on('connection', (conn) => {
  console.log('Client connected');
  conn.on('data', (message) => {
    console.log('Received message:', message);
    const data = JSON.parse(message);
   
    // Echo the received message back to the client
    conn.write(JSON.stringify(data));
  });
  conn.on('close', () => {
    console.log('Connection closed');
  });
});

// Attach SockJS server to the HTTP server
echo.installHandlers(server, { prefix: '/sockjs' });

// Serve static files (e.g., HTML/JS for client-side)
app.use(express.static('public'));

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
