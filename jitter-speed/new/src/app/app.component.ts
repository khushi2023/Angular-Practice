import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import performanceNow from 'performance-now';
// import {io,Socket} from "socket.io-client";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private socket!: WebSocket;
  private totalPackets = 10;
  private sentPackets = 0;
  private receivedAcks = 0;
  private startTime!: number;
  private endTime!: number;
  private packetTimes: number[] = [];
  private jitter: number | null = null;
  private connectionOpen = false; 
  ngOnInit() {
    this.socket = new WebSocket('ws://localhost:3000');
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.connectionOpen = true; 
      this.sendPackets();
    };
    this.socket.onmessage = (event) => {
      const endTime = performanceNow();
      const msg = JSON.parse(event.data);

      if (msg.clientSendTime) {
        // Handle packet acknowledgment
        const packetTime =endTime - msg.clientSendTime;
        this.packetTimes.push(packetTime);
        this.receivedAcks++;

        if (this.receivedAcks === this.totalPackets) {
          this.endTime = performance.now();
          this.calculateJitter();
          this.logResults();
        }
      }
    };

    this.sendPackets();
  }

  sendPackets(): void {
    this.startTime = performanceNow();
    for (let i = 0; i < this.totalPackets; i++) {
      const packet = {
        id: i,
        sendTime: performanceNow()
      };
      this.socket.send(JSON.stringify(packet));
      this.sentPackets++;
    }
  }

  calculateJitter(): void {
    if (this.packetTimes.length < 2) {
      this.jitter = 0;
      return;
    }

    const differences = [];
    for (let i = 1; i < this.packetTimes.length; i++) {
      differences.push(Math.abs(this.packetTimes[i] - this.packetTimes[i - 1]));
    }

    const mean = differences.reduce((a, b) => a + b, 0) / differences.length;
    const variance = differences.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / differences.length;
    this.jitter = Math.sqrt(variance);
  }

  logResults(): void {
    const timeTaken = this.endTime - this.startTime;
    const packetLoss = ((this.sentPackets - this.receivedAcks) / this.sentPackets) * 100;

    console.log(`Time taken to send ${this.totalPackets} packets: ${timeTaken.toFixed(2)} ms`);
    console.log(`Packets sent: ${this.sentPackets}`);
    console.log(`Acknowledgments received: ${this.receivedAcks}`);
    console.log(`Packet loss: ${packetLoss.toFixed(2)}%`);
    console.log(`Jitter: ${this.jitter?.toFixed(2)} ms`);
  }
}
