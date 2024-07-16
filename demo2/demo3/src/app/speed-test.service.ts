import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeedTestService {
 private connection: any = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
 private speedSubject = new Subject<string>();
  speedTestClient: any;
  private ipInfoUrl = "https://ipinfo.io/json";
 constructor(private ngZone: NgZone,private http: HttpClient) {
   if (this.connection) {
     this.connection.addEventListener('change', this.updateConnectionStatus.bind(this));
     this.updateConnectionStatus(); // Initialize with the current connection status
   }
 }

 getLocation(): Observable<any> {
  return this.http.get(this.ipInfoUrl);
 }
 private updateConnectionStatus() {
  this.ngZone.run(() => {
    this.speedSubject.next(this.connection.effectiveType);
  });
 }

 getNetworkSpeed(): Observable<string> {
  return this.speedSubject.asObservable();
 }

 async getNetworkQuality(region: string): Promise<{download: number, upload: number, ping: number}> {
  const thresholds ={
    'us-east':{download: 10, upload: 5},
    'us-west':{download: 15, upload: 7},
    'default':{download: 8, upload: 4}
  }

  // let region !: string;
  const currentThresholds = thresholds[region as keyof typeof thresholds] || thresholds['default'];
  
  return new Promise((resolve, reject) => {
    this.speedTestClient.on('data', (data:any) => {
      console.log(data);
      const downloadSpeed = data.speeds.download / 1_000_000; // Convert to Mbps
      const uploadSpeed = data.speeds.upload / 1_000_000; // Convert to Mbps
      const ping = data.server.ping;
      if (downloadSpeed < currentThresholds.download) {
        console.warn('Download speed is below the acceptable threshold for your region.');
      }

      if (uploadSpeed < currentThresholds.upload) {
        console.warn('Upload speed is below the acceptable threshold for your region.');
      }
      resolve({ download: downloadSpeed, upload: uploadSpeed, ping: ping });
    });
    this.speedTestClient.on('error', (err: any) => {
      reject(err);
    });

    this.speedTestClient.download.on('data', () => {});
  });
}
}
