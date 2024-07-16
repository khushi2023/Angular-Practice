import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'demo2-app';
  public isPoorConnection: boolean = false;
  warningMessage!: string;

  ngOnInit(): void {
    this.checkConnection();
    if (this.isPoorConnection) {
      this.warningMessage = 'Your internet connection seems to be poor. You might experience slower performance.';
    }
  }

  checkConnection(): void {
    if ((navigator as any).connection) {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      console.log(connection);
      
      if (connection.effectiveType < '3g' || connection.downlink < 1) {
        this.isPoorConnection = true;
      } else {
        this.isPoorConnection = false;
      }
    } 
    else {
      // Fallback for browsers that do not support the Network Information API
      // this.checkConnectionFallback();
      console.log("KHUShi");
      
    }
  }

  // checkConnectionFallback(): void {
  //   // You can implement a fallback check here, such as a small image request
  //   const img = new Image();
  //   img.src = 'https://www.example.com/test-image.jpg?' + new Date().getTime();
  //   img.onload = () => {
  //     // Connection is good if the image loads
  //     this.isPoorConnection = false;
  //   };
  //   img.onerror = () => {
  //     // Connection might be poor if the image fails to load
  //     this.isPoorConnection = true;
  //   };
  // }
}
