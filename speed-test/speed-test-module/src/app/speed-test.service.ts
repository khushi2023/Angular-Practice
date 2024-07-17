import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import {SpeedTest} from 'ng-speed-test';
@Injectable({
  providedIn: 'root'
})
export class SpeedTestService {
private apiUrl='https://api.fast.com/netflix/speedtest/v2?https=true&token={token}';
private token ='YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm';
  constructor(private http: HttpClient) { 
    // this.speedTest.getMbps().subscribe(
    //   (speed:any) => {
    //     console.log('Your speed is ' + speed);
    //   }
    // );
  }

  getSpeedTest(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.token}`
    // });
    // const headers = new HttpHeaders()
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    //   .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    console.log('service called!');
    return this.http.get(this.apiUrl.replace('{token}', this.token));
  }
}
