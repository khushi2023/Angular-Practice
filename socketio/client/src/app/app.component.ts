import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io,Socket} from 'socket.io-client';

import { CommonModule, FormStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import performanceNow from 'performance-now';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private socket!:Socket;
  ngOnInit(): void {
    this.socket = io('http://localhost:3000');

    const clientSendTime = performance.now()
    console.log(clientSendTime);
    this.socket.emit('chat messages', { data: 'Hello from the client!', clientSendTime });
    

    this.socket.on('chat messages', (msg: any) => {
      console.log(msg);
      const clientReceiveTime = performance.now();
      console.log(clientReceiveTime);
      
      const clientSendTime = msg.clientSendTime;
      const serverReceiveTime = msg.serverReceiveTime;
      const serverResponseTime = msg.serverResponseTime;

      const clientToServer = serverReceiveTime - clientSendTime;
      const serverProcessing = serverResponseTime - serverReceiveTime;
      const serverToClient = clientReceiveTime - serverResponseTime;
      const totalRoundTrip = clientReceiveTime - clientSendTime;

      console.log(`Client to Server: ${clientToServer} ms`);
      console.log(`Server Processing: ${serverProcessing} ms`);
      console.log(`Server to Client: ${serverToClient} ms`);
      console.log(`Total Round Trip: ${totalRoundTrip} ms`);
    });
    
  }
}
