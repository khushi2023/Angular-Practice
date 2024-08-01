const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const performanceNow = require('performance-now');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

let packetLatencies={};
let receivedPackets = 0;
let ackCounter = 0;
let clientSendTime;
let latency;
let latencySum=0;
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const serverReceiveTime = new Date().getTime();
        const packet = JSON.parse(message);
        console.log(packet);
        if(packet.sendTime){
            const latency = serverReceiveTime - packet.sendTime;
            console.log(`Latency: ${latency} ms`);
            latencySum+=latency;
            packetLatencies[packet.id] = latency;
        }
        
        console.log(`Received packet with ID: ${packet.id}`);
        const serverResponseTime = new Date().getTime();
        ws.send(JSON.stringify({
            id: packet.id,
            clientSendTime: packet.sendTime,
            serverReceiveTime,
            serverResponseTime
        }));
    });
    console.log(latencySum);
    ws.on('message', (message) => {
        const ack = JSON.parse(message);
        ackCounter++;
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
