import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, of, switchMap, tap } from 'rxjs';
// import {SpeedTestService} from 'ng-speed-test';

@Injectable({
  providedIn: 'root'
})
export class IspLookupService {

  constructor(private http: HttpClient, private ngZone: NgZone) {
    if (this.connection) {
      this.connection.addEventListener('change', this.updateConnectionStatus.bind(this));
      this.updateConnectionStatus(); // Initialize with the current connection status
    }
    // this.speedTestService.getMbps().subscribe(
    //   (speed) => {
    //     console.log('Your speed is ' + speed);
    //   }
    // );
  }
  private ipApiUrl = 'https://api.ipify.org?format=json'; // Public IP API
  private ipInfoUrl = 'https://ipinfo.io/{ip}/json';      // ISP Information API
  private ipGeoUrl = 'https://api.ipgeolocation.io/ipgeo?apiKey=87a823272881430280db3f676d356933&ip={ip}'; // IP Geolocation API


  private cachedIP: string | null = null;
private cachedISPInfo: any = null;
   // Get the public IP address of the user
   public getPublicIP(): Observable<any> {
    return this.http.get(this.ipApiUrl);
  }

  // Get ISP information using IPinfo API
  public getIspInfo(ip: string): Observable<any> {
    const url = this.ipInfoUrl.replace('{ip}', ip);
    return this.http.get(url);
  }

  // Get ISP information using IP Geolocation API
  public getGeolocationInfo(ip: string): Observable<any> {
    const url = this.ipGeoUrl.replace('{ip}', ip);
    return this.http.get(url);
  }

  // Main method to get ISP information
  public lookupISP(): Observable<any> {
    if (this.cachedIP && this.cachedISPInfo) {
      return of(this.cachedISPInfo); // Return cached data
    } else {
      return this.getPublicIP().pipe(
        switchMap(response => {
          const publicIP = response['ip'];
          this.cachedIP = publicIP;
          return this.getGeolocationInfo(publicIP);
        }),
        tap(data => {
          this.cachedISPInfo = data;
        })
      );
    }
  }

  /////
  private connection: any = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  private speedSubject = new Subject<string>();

  private updateConnectionStatus() {
    this.ngZone.run(() => {
      this.speedSubject.next(this.connection.effectiveType);
    });
  }

  getNetworkSpeed() {
    return this.speedSubject.asObservable();
  }
}
