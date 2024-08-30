import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  apiEndpoint: string | undefined;
  apiResponseKey: string;
  // loginauthUrl: string;
  // logoutUrl: string;

  constructor() {
    this.apiResponseKey = "ApiResponse";
    this.apiEndpoint = "https://localhost:44374"
   //this.apiEndpoint = "https://csatdev.azurewebsites.net"
    // this.apiEndpoint = "https://ews-dev-api.azurewebsites.net/api/SearchResult"
    // this.loginauthUrl = 'https://ews-dev-ui.azurewebsites.net/.auth/me';
    // this.logoutUrl = 'https://ews-dev-ui.azurewebsites.net/.auth/logout';
  }  
}
