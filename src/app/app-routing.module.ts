import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CustomerfeedbackreportComponent } from './customerfeedbackreport/customerfeedbackreport.component';
import { MenupageComponent } from './menupage/menupage.component';
import { FdbkfinalComponent } from './fdbkfinal/fdbkfinal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateclientdetailsComponent } from './updateclientdetails/updateclientdetails.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ConfirmpasswordComponent } from './confirmpassword/confirmpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FeedbackproceedComponent } from './feedbackproceed/feedbackproceed.component';
import { FinalfeedbackComponent } from './finalfeedback/finalfeedback.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FormNextComponent } from './form-next/form-next.component';
const routes: Routes = [
  {
    path: "login-page",

    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/login-page',
    pathMatch: 'full'
  },
  // {
  //   path:"survey",

  //   component:SurveyComponent
  // },
  // {
  //   path:"customerReport",

  //   component:CustomerReportComponent
  // },
  // {
  //   path:"feedback",

  //   component:FeedbackComponent
  // },
  {
    path: "Menupage", component: MenupageComponent,
    children: [
      {
        path: "feedback", component: FeedbackComponent
      },
      {
        path: "customerReport", component: CustomerReportComponent
      },
      {
        path: "customerfeedbackreport", component: CustomerfeedbackreportComponent

      },
      {
        path: "survey\:id\:project\:uid",

        component: SurveyComponent
      },

      {
        path: "dashboard", component: DashboardComponent
      },
      {
        path: "updateclientdetails",component:UpdateclientdetailsComponent
      },
      {
        path:'resetpassword',component:ResetpasswordComponent
      }

    ]

  },
  // {
  //   path:"customerfeedbackreport", component:CustomerfeedbackreportComponent

  // },
  {
    path: 'Fdbkfinal', component: FdbkfinalComponent
  },
  {
path:'forgotpassword',component:ForgotpasswordComponent
  },
  {
    path:'confirmpassword',component:ConfirmpasswordComponent
  },
  {path:'feedbackproceed',component:FeedbackproceedComponent},
  {path:'finalfeedback',component:FinalfeedbackComponent},
  {path:'feedback-form',component:FeedbackFormComponent},
  {path:'form-next',component:FormNextComponent}


  //{ path: '**', redirectTo: '/feedback', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
