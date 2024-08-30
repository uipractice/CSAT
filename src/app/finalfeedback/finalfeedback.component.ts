import { Component, } from '@angular/core';
import { EmojiComponent } from '../emoji/emoji.component';

@Component({
  selector: 'app-finalfeedback',
  templateUrl: './finalfeedback.component.html',
  styleUrls: ['./finalfeedback.component.scss']
})
export class FinalfeedbackComponent {
  projectName : string = "PD Instore";
  surveyLink! : string;
  constructor(){}
  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params:any) => {
  //     this.projectName = atob(params['project']);
  //     const pname : string = params['project'];
  //     const email=params['uid'];
  //     const ProjectId=params['id'];
  //     this.surveyLink = `/Fdbkfinal?id=${ProjectId}&project=${pname}&uid=${email}`;
  //   });
  // }
}
