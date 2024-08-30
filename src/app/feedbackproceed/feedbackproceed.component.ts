import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedbackproceed',
  templateUrl: './feedbackproceed.component.html',
  styleUrls: ['./feedbackproceed.component.scss']
})
export class FeedbackproceedComponent {
  projectName : string = "PD Instore";
  surveyLink! : string;
  constructor(private route : ActivatedRoute,private router : Router,private location : Location){}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this.projectName = atob(params['project']);
      const pname : string = params['project'];
      const email=params['uid'];
      const ProjectId=params['id'];
      this.surveyLink = `/Fdbkfinal?id=${ProjectId}&project=${pname}&uid=${email}`;
    });
  }
  Proceed(){
    //this.location.go("");
    //this.router.navigate([this.surveyLink]);
    //window.location.href = this.surveyLink;
    this.location.go(this.surveyLink); // Updates the URL
    window.location.reload(); // Forces a reload
  }
}
