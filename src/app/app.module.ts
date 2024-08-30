import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FeedbackComponent } from './feedback/feedback.component';
import { SDLCService } from './sdlc.service';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ChatComponent } from './chat/chat.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { ReportComponent } from './report/report.component';
import { CustomerfeedbackreportComponent } from './customerfeedbackreport/customerfeedbackreport.component';
// import { NgChartsModule } from 'ng2-charts/lib/ng-charts.module';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenupageComponent } from './menupage/menupage.component';
import { PiechartComponent } from './Charts/piechart/piechart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableModule } from '@angular/material/table';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { FdbkfinalComponent } from './fdbkfinal/fdbkfinal.component';
import {MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UpdateclientdetailsComponent } from './updateclientdetails/updateclientdetails.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ConfirmpasswordComponent } from './confirmpassword/confirmpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FeedbackproceedComponent } from './feedbackproceed/feedbackproceed.component';
import { FinalfeedbackComponent } from './finalfeedback/finalfeedback.component';
import { EmojiComponent } from './emoji/emoji.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FormNextComponent } from './form-next/form-next.component';




@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    HeaderComponent,
    FeedbackComponent,
    ChatComponent,
    CustomerReportComponent,
    ReportComponent,
    LoginPageComponent,
    CustomerfeedbackreportComponent,
    MenupageComponent,
    PiechartComponent,
    FdbkfinalComponent,
    DashboardComponent,
    UpdateclientdetailsComponent,
    ForgotpasswordComponent,
    ConfirmpasswordComponent,
    ResetpasswordComponent,
    FeedbackproceedComponent,
    FinalfeedbackComponent,
    EmojiComponent,
    FeedbackFormComponent,
    FormNextComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    NgApexchartsModule,
    MatTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTooltipModule,
    MatPaginatorModule,
    MatTabsModule,
    NgxPaginationModule,
    MatSortModule

  ],
  providers: [SDLCService,DatePipe,NgForm],
  bootstrap: [AppComponent]
})
export class AppModule { }
