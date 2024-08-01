import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, CommonModule],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
public packetTimeSum = 0;
public socket!: WebSocket;
public totalPackets = 20;
public sentPackets = 0;
public receivedAcks = 0;
public startTime!: number;
public endTime: number | null = null;
public packetTimes: { id: number; sendTime: number; receiveTime?: number; roundTripTime?: number }[] = [];
public jitter: number | null = null;
public packetLoss: number | null = null;
public avgLatency: number = 0;
public loading: boolean = true;
public progress: number = 0; 
private packetInterval: any;
private packetId: number = 1;
ngOnInit() {
  this.startLoading();
}
startLoading(){
  setTimeout(() => {
    this.initializeWebSocket();
  }, 1000);
}
initializeWebSocket(){
  this.socket = new WebSocket('ws://localhost:3000');
this.socket.onopen = () => {
console.log('WebSocket connection established.');
this.sendPackets();
};
this.socket.onmessage = (event) => {
const endTime = new Date().getTime();
const msg = JSON.parse(event.data);
console.log(msg);

if (msg.clientSendTime) {
const packet = this.packetTimes.find(p => p.id === msg.id);
console.log(packet);
if (packet) {
packet.receiveTime = endTime;
packet.roundTripTime = endTime - packet.sendTime;
this.packetTimeSum += packet.roundTripTime;
}
this.receivedAcks++;
this.updateProgress(); 
if (this.receivedAcks === this.totalPackets) {
this.endTime = endTime;
this.calculateJitter();
this.calculateAvgLatency();
this.calculatePacketLoss();
this.logResults();
}
}
};
}
updateProgress(): void {
  this.progress = (this.receivedAcks / this.totalPackets) * 100;
}

calculateAvgLatency(): void {
if (this.packetTimes.length > 0) {
this.avgLatency = this.packetTimeSum / this.packetTimes.length;
} else {
this.avgLatency = 0;
}
}

sendPackets(): void {
  this.packetInterval = setInterval(() => {
    if (this.packetId <= this.totalPackets) {
      const packet = {
        id: this.packetId,
        sendTime: new Date().getTime()
      };
      if (this.packetId === 1) {
        this.startTime = packet.sendTime;
      }
      this.packetTimes.push(packet);
      console.log(this.packetTimes.length);
      
      this.socket.send(JSON.stringify(packet));
      this.sentPackets++;
      this.packetId++;
    } else {
      clearInterval(this.packetInterval);
    }
  }, 500);
}

calculateJitter(): void {
if (this.packetTimes.length < 2) {
this.jitter = 0;
return;
}

const differences = [];
for (let i = 1; i < this.packetTimes.length; i++) {
if (this.packetTimes[i].roundTripTime !== undefined && this.packetTimes[i - 1].roundTripTime !== undefined) {
differences.push(Math.abs((this.packetTimes[i].roundTripTime || 0) - (this.packetTimes[i - 1].roundTripTime || 0)));
console.log(differences);

}
}

const mean = differences.reduce((a, b) => a + b, 0) / differences.length;
console.log(mean);

const variance = differences.reduce((a, b) => a + (b - mean) ** 2, 0) / differences.length;
console.log(variance);

this.jitter = Math.sqrt(variance);
;

}

calculatePacketLoss(): void {
this.packetLoss = ((this.sentPackets - this.receivedAcks) / this.sentPackets) * 100;
}

logResults(): void {

console.log(`Packets sent: ${this.sentPackets}`);
console.log(`Acknowledgments received: ${this.receivedAcks}`);
console.log(`Packet loss: ${this.packetLoss}%`);
console.log(`Jitter: ${this.jitter} ms`);
console.log(`Avg Latency: ${this.avgLatency} ms`);
console.log(this.packetTimes);

this.loading = false;
}
}

