import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeedTestService {
  private speedTestClient = speedTest({ maxTime: 5000 });
  private ipInfoUrl = 'https://ipinfo.io/json?token=c47d0f4643877f'; // Replace with your API token

  constructor(private http: HttpClient) {}
 // Method to get GeoLocation
 getGeoLocation(): Observable<any> {
  return this.http.get(this.ipInfoUrl).pipe(
    catchError(error => {
      console.error('Error getting geo-location:', error);
      return of({ region: 'default' }); // Return a default region if there's an error
    })
  );
}

  // Method to perform Network Quality Tests
  getNetworkQuality(region: string): Promise<{ download: number, upload: number, ping: number }> {
    // Example region-based threshold
    const thresholds = {
      'us-east': { download: 10, upload: 5 }, // Mbps
      'us-west': { download: 15, upload: 7 },
      'default': { download: 8, upload: 4 }
    };

    const currentThresholds = thresholds[region] || thresholds['default'];

    return new Promise((resolve, reject) => {
      this.speedTestClient.on('data', data => {
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

      this.speedTestClient.on('error', err => {
        reject(err);
      });

      this.speedTestClient.download.on('data', () => {});
    });
  }

  // Method to check API endpoint health
  checkApiHealth(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl, { observe: 'response' }).pipe(
      catchError(error => {
        console.error('Error checking API health:', error);
        return of({ status: 500 }); // Return a failure status if there's an error
      })
    );
  }

  // Method to measure latency to your server
  getPing(url: string): Promise<number> {
    const start = Date.now();
    return fetch(url, { method: 'HEAD' })
      .then(() => Date.now() - start)
      .catch(() => -1); // Return -1 if the ping fails
  }

  
}
