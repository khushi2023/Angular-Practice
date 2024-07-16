import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IspLookupComponent } from './isp-lookup/isp-lookup.component';
import { CommonModule } from '@angular/common';
import { IspLookupService } from './isp-lookup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IspLookupComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'speed-test-module';
  public isPoorConnection: boolean = false;
  warningMessage!: string;

  constructor(private ispService: IspLookupService){}

  ngOnInit(): void {
    this.checkConnection();
    // if (this.isPoorConnection) {
    //   this.warningMessage = 'Your internet connection seems to be poor. You might experience slower performance.';
    // }else{
    //   this.warningMessage = '';
    // }
  }

  checkConnection(): void {
    this.ispService.getNetworkSpeed().subscribe((speed) => {
      console.log(speed);

      if(speed < "3g") {
        this.isPoorConnection = true;
        this.warningMessage = 'Your internet connection is slow. You might experience slower performance.'
      }
      else{
        this.isPoorConnection = false;
        this.warningMessage = '';
      }
    })
  }
}
