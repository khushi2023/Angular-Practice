import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeedTestService } from './speed-test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'demo3';
  networkQuality: { download: number, upload: number, ping: number } | null = null;
  apiStatus: string = '';
  warningMessage: string = '';
  geoLocation: any = null;
  performanceWarning: string='';
  constructor(private networkService: SpeedTestService){}
  
  async ngOnInit(): Promise<void> {
    try {
      // Get GeoLocation
      this.geoLocation = this.networkService.getLocation();;
      console.log('GeoLocation:', this.geoLocation);
      
      // Use the region from geoLocation for ISP quality checks
      const region = this.geoLocation.region; // Get region from GeoLocation API

      // Check network quality
      this.networkQuality = await this.networkService.getNetworkQuality(region);
      console.log('Network Quality:', this.networkQuality);

      // Check latency to the server
      // const latency = await this.networkService.getPing('https://your-server-url.com');
      // console.log('Latency:', latency);
      // if (latency > 200) {
      //   this.performanceWarning = 'Your connection may be slow.';
      // }

      // // Check API response
      // const apiResponse = await this.apiService.checkApiHealth('https://your-api-url.com/health').toPromise();
      // if (apiResponse.status !== 200) {
      //   this.apiStatus = 'API is down or experiencing issues.';
      // }

      // Check if website performance is optimal
      // const pageLoadTime = performance.now();
      // if (pageLoadTime > 3000) {
      //   this.performanceWarning = 'The website is currently experiencing high load times.';
      // }

      // // Check ISP Quality Based on Region
      // if (region === this.geoLocation) {
      //  console.log("Khushi");
       
      // } 
      if (this.networkQuality.download < 5 || this.networkQuality.upload < 1) {
        this.warningMessage = 'Your internet connection seems to be poor. You might experience slower performance.';
      } else {
        this.warningMessage = '';
      }
    } catch (error) {
      console.error('An error occurred:', error);
      this.performanceWarning = 'An error occurred while checking network quality or API health.';
    }
  }
}
