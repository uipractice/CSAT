import { Component } from '@angular/core';
import { ApiserviceService } from '../survey/apiservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public curName : string = '';
  constructor(private  apiserviceService : ApiserviceService){}
  ngOnInit(): void {
   this.curName  = this.apiserviceService.GetUserName;
  }
}