import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IspLookupService {

  constructor(private http: HttpClient) { }
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
}
