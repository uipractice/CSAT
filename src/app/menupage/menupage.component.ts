import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../survey/apiservice.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface RouteComponentClassMap {
  [key: string]: string;
}
@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.scss']
})

export class MenupageComponent {

  public curName : string = '';
  currentComponentClass: string = '';
  isCustomerReportActive: boolean = false;
  constructor(private  apiserviceService : ApiserviceService,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
   this.curName  = this.apiserviceService.GetUserName;


   // Set the initial background class on page load
   setTimeout(() => {
    this.currentComponentClass = this.getComponentClass(this.activatedRoute.snapshot);
  });

  // Subscribe to route changes
  this.activatedRoute.url.subscribe(() => {
    // Set the class based on the component's route
    this.currentComponentClass = this.getComponentClass(this.activatedRoute.snapshot);
  });
   this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Get the current activated route
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }

        // Set the class based on the component's route
        this.currentComponentClass = this.getComponentClass(route.snapshot);
      });
  }

  private getComponentClass(routeSnapshot: any): string {
    // Define the mapping between route paths and component classes
    const routeComponentClassMap: RouteComponentClassMap = {
      'feedback': 'card1',
      'customerReport': 'card2',
      'customerfeedbackreport': 'card2',
      'survey': 'card2',
      'resetpassword' : 'card2',
    };

    // Get the route path
    const routePath = routeSnapshot.routeConfig?.path || 'card1';

    this.isCustomerReportActive = routePath === 'customerReport' || routePath === 'customerfeedbackreport' || routePath === 'resetpassword';


    // Return the corresponding component class
    return routeComponentClassMap[routePath] || 'card1';
  }
}
