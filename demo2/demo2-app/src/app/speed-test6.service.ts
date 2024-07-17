import { Injectable } from '@angular/core';
// import * as SpeedTest from 'speedtest-net';
import   Speedtest from 'speedtest-net';
// import sdf from './test';
@Injectable({
  providedIn: 'root'
})
export class SpeedTest6Service {

  constructor() { }
  // runSpeedTest(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const test = SpeedTest({ maxTime: 5000 }); // Adjust maxTime as needed

  //     test.on('data', (data:any) => {
  //       resolve(data);
  //     });

  //     test.on('error', (err:any) => {
  //       reject(err);
  //     });
  //   });
  // }


   async getSpeed(): Promise<{ download: number; upload: number }> {
    return new Promise((resolve, reject) => {
      const test = Speedtest();

      // test.on('data', (data) => {
      //   resolve({
      //     download: data.speeds.download,
      //     upload: data.speeds.upload,
      //   });
      // });

      // test.on('error', (err) => {
      //   reject(err);
      // }
    // );
    console.log(test);
    
    });
  }
}


