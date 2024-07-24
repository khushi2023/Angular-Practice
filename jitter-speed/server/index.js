const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const performanceNow = require('performance-now');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
// app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

let packetCounter = 0;
let ackCounter = 0;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const packet = JSON.parse(message);
        const serverReceiveTime = performanceNow();
        console.log(`Received packet with ID: ${packet.id}`);
        
        const serverResponseTime = performanceNow();
        ws.send(JSON.stringify({
            id: packet.id,
            clientSendTime: packet.sendTime,
            serverReceiveTime,
            serverResponseTime
        }));
    });

    ws.on('message', (message) => {
        const ack = JSON.parse(message);
        ackCounter++;
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
