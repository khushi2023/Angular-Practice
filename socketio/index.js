const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
// const io = new Server(server);
const performanceNow = require('performance-now');
const io = socketIo(server, {
    cors: { origin: '*' }
  });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log("conncetion");
//    socket.on('chat messages', (msg) => {
//     console.log(msg);
//     console.log(`Received message: ${msg}`);
//     socket.emit('chat message', msg);
//    });
// });


io.on('connection', (socket) => {
socket.on('chat messages', (msg) => {
const serverReceiveTime = performanceNow();
console.log(`Received message from client: ${msg.data}`);
console.log(`Client Send Time: ${msg.clientSendTime}`);
const serverResponseTime = performanceNow();

socket.emit('chat messages', {
data: msg.data,
clientSendTime: msg.clientSendTime,
serverReceiveTime,
serverResponseTime
});
});
});
server.listen(3000, () => {
console.log('listening on *:3000');
});
