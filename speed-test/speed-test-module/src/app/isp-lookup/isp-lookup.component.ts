import { Component, OnInit } from '@angular/core';
import { IspLookupService } from '../isp-lookup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-isp-lookup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './isp-lookup.component.html',
  styleUrl: './isp-lookup.component.css'
})
export class IspLookupComponent implements OnInit {
  publicIP: string | null = null;
  data:any;
  ispInfo: any;

  constructor(private ispLookupService: IspLookupService) {}

  ngOnInit() {
    this.lookupISP();
  }

  lookupISP() {
    this.ispLookupService.lookupISP().subscribe(data => {
      console.log(data);
      this.data = data;
      this.publicIP = data.ip;
      this.ispInfo = data.isp || data.org; // Display ISP or Org information
    });
    console.log(this.ispInfo);
    console.log(this.data);
    
    
  }
}
