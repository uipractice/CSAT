import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators, FormsModule, FormArray } from '@angular/forms';
import { SDLCService, SendEmail, DropdownList } from '../sdlc.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

interface SelectedData {
  [projectName: string]: { email: string; custname: string };
}



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {


  // @ViewChild('customerContainer',{static:true}) customerContainer!:ElementRef<HTMLDivElement>
  selectedData: SelectedData = {};
  sendEmailData!: SendEmail;
  ddlSDFCMethods!: any;
  projectDetails: any;
  projectDetailsbyDM: any;
  customers: any;
  selectedProjectWorkType!: string;
  selectedProjectWorkTypeId!: number;
  selectedProjectName!: string;
  selectedProject!: string;
  date = new FormControl();
  serializedDate = new FormControl();
  date1 = new FormControl();
  serializedDate1 = new FormControl();
  selectedCustomerNames: string[] = [];
  //selectedCustomerEmails: string[] = [];
  selectedCustomerEmails: { email: any, managerName: any, clientID: any }[] = [];
  selectedPwT: string[] = [];
  selectedPwTbyDM: string[] = [];
  selectedProj: string[] = [];
  selectedProjectId!: number;
  fromDate!: Date;
  toDate!: Date;
  MailUpdate: string = "Email sent successfully!";
  saveSurvey: string = "Successfully Saved Survey";
  surveyFeed: boolean = false;
  formIsValid: boolean = false;
  selectedDeliveryManager: string = '';
  selectedDeliveryManagerEmail: string = '';
  selectedProjects: number[] = [];
  date2 = new FormControl();
  EmailId!: string;
  selectedValue: string = ''; // Initialize with an empty string or default value
  //selectField: any;
  myForm: FormGroup;
  formGroup: any;
  myFormSubmitted: boolean = false;
  maxDate: Date = new Date();
  selectProjectType: string = ""
  selectDeliveryManger: string = ""
  selectProject: string = ""
  selectName: string = ""
  hiddenInput: string = ""
  errorMessage: string = ""
  worktype: string = ""
  deliveryManagerOptions: { value: string, label: string }[] = [];
  showCustomer: boolean=false;
  validationMessage:string='';
  isValidDates : boolean = false;
  formattedFromDate?: string = "";
  formattedToDate?: string = "";
  isDisabled :boolean = false;

  //projectDetails: { deliveryManagers: any[], projects: any[] } = { deliveryManagers: [], projects: [] };
  constructor(private fb: FormBuilder, private sdlcService: SDLCService, private router: Router, private datePipe: DatePipe, private ngForm: NgForm, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    const currentDate = new Date();
    const sixMonthsBack = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    this.date.setValue(currentDate);
    this.serializedDate.setValue(currentDate.toISOString());
    this.date1.setValue(sixMonthsBack);
    this.serializedDate1.setValue(sixMonthsBack.toISOString());

    this.myForm = this.fb.group({
      projectWorkType: ['', Validators.required],
      Projects: ['', Validators.required],
      dmManager: ['', Validators.required],
      //customerName:[false, Validators.required]
      cust: this.fb.group({
        customerName: [false],
        hideInput: ['']
      })
    });
    this.myForm.get('cust.customerName')?.setValue([]);
  }


  ngOnInit() {

    this.sdlcService.GetProjectWorkType().subscribe(
      data => {
        this.ddlSDFCMethods = data;
      }
    )

  }
  // clearCustomerName() {
  //   const customerContainer = this.customerContainer.nativeElement;
  //   customerContainer.innerHTML = '';
  //   this.myForm.controls['customerName'].reset();
  // }

  onProjectWorkTypeChange(event: any): void {

    this.selectProject = "";
    this.errorMessage = '';
    this.customers = [];
    this.projectDetailsbyDM = [];
    //this.myForm.get('customerName')?.setValue([]);
    // this.resetCheckBoxAndHiddenInput();
    // console.log(this.myForm.controls['projectWorkType'].value)
    // console.log(this.myForm.controls['dmManager'].value)

    const workType = event.target.value;
    if (workType) {
      this.selectedPwT = workType.split(',');
      this.selectedProjectWorkTypeId = Number(this.selectedPwT[0]);
      this.selectedProjectWorkType = this.selectedPwT[1];

      const selectedProjectWorkTypeId = this.selectedProjectWorkTypeId;
      if (selectedProjectWorkTypeId) {
        this.getProjectDetailsByProjectDataId(+selectedProjectWorkTypeId);
      } else {
        // this.projectDetails = ;
      }
    }
    else {
      this.projectDetails = [];
    }

    this.validateForm();
  }

  // resetCheckBoxAndHiddenInput(){
  //   const customerCheckbox= document.getElementById('customerCheckbox') as HTMLInputElement
  //   const SelectedCustomerEmailsField= document.getElementById('SelectedCustomerEmailsField') as HTMLInputElement
  //   if(customerCheckbox){
  //     customerCheckbox.checked=false;
  //   }
  //   if(SelectedCustomerEmailsField){
  //     SelectedCustomerEmailsField.value='';
  //   }
  // }

  getProjectDetailsByProjectDataId(worktypeId: number) {
    this.sdlcService.getProjectDetails(worktypeId)
      .subscribe(
        (data) => {
          this.projectDetails = data.employeeResults;
          // this.projectDetailsbyDM=data.projectResults;
          console.log('Project Details: ', this.projectDetails);
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
      );

  }

  getProjectsByDM(event: any): void {
    this.errorMessage = ''
    this.customers = [];
    const worktypeId = this.selectedProjectWorkTypeId;
    const projectType = this.myForm.get('projectWorkType')?.value;
    const dManager = event.target.value;
    this.selectedPwTbyDM = dManager.split(',');
    this.selectedProjectId = Number(this.selectedPwTbyDM[1]);
    this.selectedProjectWorkType = this.selectedPwTbyDM[0];
    this.selectedDeliveryManagerEmail = this.selectedPwTbyDM[2];
    if (projectType && dManager) {
      this.sdlcService.getProjectsByEmployeeId(worktypeId, this.selectedProjectId).subscribe(
        (response) => {
          console.log(response);
          this.projectDetailsbyDM = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.validateForm();

  }
  onProjectSelectionChange(event: any): void {
    this.errorMessage = ''
    this.showCustomer=true;
    const selectedProject = event.target.value;
    this.selectedProj = selectedProject.split(',');
    this.selectedProjectId = Number(this.selectedProj[0]);
    this.selectedProjectName = this.selectedProj[1];
    this.selectedProject = event.target.value;
    if (this.selectedProjectId) {
      this.getCustomersByProjectId(this.selectedProjectId);
    } else {
      this.customers = [];
    }
    this.validateForm();
  }
  getCustomersByProjectId(projectId: number): void {

    this.sdlcService.getClientDetailsByProjectId(projectId).subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  sendEmail(): void {
    this.myFormSubmitted = true;
    this.isDisabled = true;
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      if(this.fromDate == null)
      this.fromDate = this.date1 ? this.date1.value : null;
      if(this.toDate == null)
      this.toDate = this.date ? this.date.value : null;
      if(this.fromDate>this.toDate){
      this.isValidDates = true;
        this.validationMessage='Please ensure the to date is after the from date.';
      }
      else{
        this.isValidDates = false;
        this.validationMessage= "";
      const projectName = this.selectedProjectName;
      this.formattedFromDate = this.datePipe.transform(this.fromDate, 'MMM-dd-yyyy')?.toString();
      this.formattedToDate = this.datePipe.transform(this.toDate, 'MMM-dd-yyyy')?.toString();
      const currentDate = new Date();
      const sevenDaysLater = new Date(currentDate);
      sevenDaysLater.setDate(currentDate.getDate() + 1);
      if (this.selectedCustomerEmails.length > 0) {
        for (const customerEmail of this.selectedCustomerEmails) {
          const emailData1 = {
            ProjectID: this.selectedProjectId,
            StartDate: this.fromDate,
            EndDate: this.toDate,
            clientID: customerEmail.clientID,
            EmailTriggerDate: new Date(),
            Reminder: 0,
            ReminderDate: sevenDaysLater
          };
          this.sdlcService.sendEmailTracking(emailData1,this.selectedProjectWorkTypeId).subscribe(
            (response) => {
              if (response == 'Email already sent to this client for the specified project.') {
                this.MailUpdate = 'Email already sent to this client for the specified project.';
                this.showModal();
                this.isDisabled = false;
              }
              else {
                this.EmailId = response;
                const emailData = {
                  to: customerEmail.email,
                  cc: this.selectedDeliveryManagerEmail,
                  subject: `We Value Your Opinion: Evoke Technologies’ CSAT Survey`,
                  text: this.constructEmailBody(projectName, customerEmail.managerName, this.EmailId,this.formattedFromDate,this.formattedToDate),
                };
                this.sdlcService.sendEmail(emailData,this.selectedProjectId,response,this.selectedProjectWorkTypeId).subscribe(
                  (response) => {
                    this.showModal();
                    this.isDisabled = false;
                  },
                  (error) => {
                    this.MailUpdate = error.error;
                    this.showModal();
                    this.isDisabled = false;
                  }
                );
              }
            },
            (error) => {
              this.MailUpdate = error.error;
              this.showModal();
              this.isDisabled = false;
            }
          );
        }
      }
      else {
        this.isDisabled = false;
        this.errorMessage = "Please select at least one Customer.";
      }
    }
    }
    else {
      this.isDisabled = false;
      this.errorMessage = "Please select at least one Customer.";
    }
  }

  constructEmailBody(projectName: any, customernames: any, email: any,formattedFromDate?:string,formattedToDate?:string): string {

    this.selectedProjects = this.selectedProjects;
    this.selectedCustomerNames = this.selectedCustomerNames;
    const surveyLink = `${window.location.origin}/feedbackproceed?id=${encodeURIComponent(btoa(this.selectedProjectId.toString()))}&project=${encodeURIComponent(btoa(projectName))}&uid=${encodeURIComponent(btoa(email))}`;//
    const emailBody = `
        <html>
            <body>
                <p>Dear ${customernames},</p>

                <p>Hope you are doing well.!</p>

                <p>We would greatly appreciate it if you could take a few minutes to share your feedback on the services we have
                provided during the period(${formattedFromDate} to ${formattedToDate}). Your insights will help us understand what we are doing well and where we can make improvements to
                better meet your needs.</p>
                <p>Feel free to provide any additional comments or suggestions that you think would contribute to our ongoing
                efforts to enhance our services.</p>

                <p><a href="${surveyLink}" [queryParams]="{ id: ${encodeURIComponent(btoa(this.selectedProjectId.toString()))}, project: ${encodeURIComponent(btoa(projectName))}, uid: ${encodeURIComponent(btoa(email))} }" target="_blank">Click here</a> to proceed</p>

                <p>Thanks,<br/></p>
                <img src='data:image/jpeg;base64,base64Image' alt='Embedded Image'>
            </body>
        </html>
    `;
    return emailBody;
  }

  navigateToSurvey(projectName: string): void {
    window.location.href = `/survey?project=${encodeURIComponent(projectName)}`;
  }
  onCheckboxChange(clientEmail: any, clientManagerName: any, clientID: any, isChecked: boolean): void {
    // const customerNameArray = this.myForm.get('cust.customerName') as FormArray;

    if (isChecked) {
      //customerNameArray.push(new FormControl(clientManagerName));
      this.selectedCustomerEmails.push({ email: clientEmail, managerName: clientManagerName, clientID: clientID })
      this.errorMessage = '';
    } else {
      const index = this.selectedCustomerEmails.findIndex((item: any) => item.email === clientEmail);
      if (index !== -1) {
        this.selectedCustomerEmails.splice(index, 1);
      }

      //
    }
    if (this.selectedCustomerEmails.length === 0) {
      this.errorMessage = 'Please select at least one Customer.';
    } else {
      this.errorMessage = '';
    }


    this.cdr.markForCheck();
    this.validateForm();
  }
  isCustomerNameValid(): boolean {
    const customerNameArray = this.myForm.get('cust.customerName')?.value;
    this.errorMessage = "Please select at least one Customer.";
    return customerNameArray && customerNameArray.length > 0;

  }
  handleCheckboxChange(projectName: string, email: string, custname: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedData[projectName]) {
        this.selectedData[projectName] = { email, custname };
      } else {
      }
    } else {
      if (this.selectedData[projectName] && this.selectedData[projectName].email === email) {
        delete this.selectedData[projectName];
      } else {
      }
    }
  }

  validateForm(): void {
    this.formIsValid = !!this.selectedProjectWorkType && !!this.selectedDeliveryManager;
  }
  onOkButtonClick() {
    this.hideModal();

  }


  showModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  hideModal() {
    location.reload();
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }

  }

  clearInputs() {
    this.myFormSubmitted = false;
    this.myForm.get('projectWorkType')?.setValue('');
    this.errorMessage = "";
    this.myForm.get('Projects')?.setValue('');
    this.myForm.get('dmManager')?.setValue('');
    this.selectedPwTbyDM = [];
    this.customers = [];
    this.myForm.get('customerName')?.setValue('');
    this.projectDetailsbyDM = [];
    this.projectDetails = [];
    const currentDate = new Date();
    const sixMonthsBack = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    this.date.setValue(currentDate);
    this.serializedDate.setValue(currentDate.toISOString());
    this.date1.setValue(sixMonthsBack);
  }
  onInput(e:KeyboardEvent){
    if(e.keyCode===8){
    e.preventDefault();
    }else{
    console.log(e.which);
    }
  }
  CurrentFromDate(event : any){
    this.fromDate = event.value;
  }
  CurrentToDate(event : any){
    this.toDate = event.value;
  }
}
