import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ApiserviceService } from '../survey/apiservice.service';
import { PiechartComponent } from '../Charts/piechart/piechart.component';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit, AfterViewInit {
  dateFilterForm!: FormGroup;
  @ViewChild('pieChart') pieChart!: ElementRef;
  chart: any;
  projectList: any = [];
  dropValue: any;
  projectList1: string[] = ['Project A', 'Project B', 'Project C'];
  seriesValue: any;
  projectNames: any;
  date1 = new FormControl();
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['projectName', 'customerName', 'status'];
  tableData = [
    { projectName: 'Alltrista Plastics LLC', customerName: 'Priscilla', status: 'Completed' },
    { projectName: 'Dorman Products', customerName: 'Supriya', status: 'In Progress' },
    { projectName: 'Brentwood Originals', customerName: 'Uma', status: 'Not Started' },
  ];
  projectSurveyDetails: any;
  isPieChart: boolean = false;
  apiDataReceived: boolean = false;
  noDataReceived: boolean = false;
  maxDate: Date = new Date();
  minDate:Date=new Date(-6);
  validationMessage:string='';
  @ViewChild('PaiChart') piechartComponent!: PiechartComponent;

  constructor(private fb: FormBuilder, private ApiserviceService: ApiserviceService) {
    const currentDate = new Date();
    const sixMonthsBack = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    this.date1.setValue(sixMonthsBack);
   }

  ngOnInit(): void {
    this.initForm();
    //  const fromDate = new Date('2023-12-07'); // Set your fromDate
    //  const toDate = new Date('2023-12-07');   // Set your toDate


    this.getProjects();
  }
  ngAfterViewInit(): void {
    // this.projectNames = ['Not Started', 'Inprogress', 'Completed'];

    // const percentages = [40, 30, 30];

    // this.seriesValue = percentages.map(percentage => (100 * percentage) / 33.33);

    // this.piechartComponent.refreshChart(this.seriesValue, this.projectNames);
  }

  getProjects() {
    this.ApiserviceService.getProjects().subscribe({
      next: (data: any) => {
        this.projectList = data;
        // this.piechartComponent.refreshChart(this.projectList1.map(project => project.value), this.projectList1.map(project => project.name));
      },
      error: (error: any) => { console.log(error) }
    })

  }
  private initForm(): void {
    this.dateFilterForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
  }

  submitForm(): void {

    if (this.dateFilterForm.valid) {
      const fromDate: string = format(this.dateFilterForm.get('fromDate')?.value, 'yyyy-MM-dd');
      const toDate: string = format(this.dateFilterForm.get('toDate')?.value, 'yyyy-MM-dd')
      if(fromDate>toDate){
        this.apiDataReceived = false;
        this.noDataReceived = true;
        this.projectSurveyDetails='';
        this.validationMessage='Please ensure the end date is after the start date.';
      }
      else{
      this.ApiserviceService.getProjectSurveyDetails(fromDate, toDate)
        .subscribe(data => {
          if(data && data.length>0)
          {
          this.projectSurveyDetails = data;
          if (this.projectSurveyDetails) {
            this.dataSource = new MatTableDataSource(this.projectSurveyDetails);
            this.isPieChart = true;
            const completedCount = this.projectSurveyDetails.filter((item: any) => item.clientName === 'Completed').length;
            const inProgressCount = this.projectSurveyDetails.filter((item: any) => item.clientName === 'Inprogress').length;
            const notStartedCount = this.projectSurveyDetails.filter((item: any) => item.clientName === 'Not Started').length;

            const totalCount = this.projectSurveyDetails.length;

            const completedPercentage = (completedCount / totalCount) * 100;
            const inProgressPercentage = (inProgressCount / totalCount) * 100;
            const notStartedPercentage = (notStartedCount / totalCount) * 100;
            const seriesValues = [completedPercentage, inProgressPercentage, notStartedPercentage];
            const labels = ['Completed', 'In Progress', 'Not Started'];
            this.seriesValue = seriesValues;
            this.projectNames = labels;
            this.apiDataReceived = true;
            this.noDataReceived = false;
          }
          }
        else
        {
          this.apiDataReceived = false;
          this.noDataReceived = true;
          this.projectSurveyDetails='';
          this.validationMessage='Report is not available';
        }
        });
      }
    }
  }

  // generateReport() {
  //   const submitted = 50;
  //   const receivedEmail = 30;
  //   const gotMailNotSubmitted = 20;

  //   const data = [submitted, receivedEmail, gotMailNotSubmitted];
  //   const labels = ['Submitted', 'Received Email', 'Got Mail but Not Submitted'];

  //   this.updateChart(data, labels);
  // }
 showDateErrors: boolean = false;

generateReport() {
  if (this.dateFilterForm.get('fromDate')!.invalid || this.dateFilterForm.get('toDate')!.invalid) {
    this.showDateErrors = true;
  } else {
    this.submitForm();
  }
}
  // generateReport(): void {
  //   this.submitForm();
  // }
  updateChart(data: number[], labels: string[]) {

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.pieChart.nativeElement.getContext('2d');

    // this.chart = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: {
    //     labels: labels,
    //     datasets: [{
    //       data: data,
    //       backgroundColor: [
    //         'rgba(75, 192, 192, 0.7)',
    //         'rgba(255, 99, 132, 0.7)',
    //         'rgba(255, 205, 86, 0.7)'
    //       ],
    //       borderColor: [
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(255, 205, 86, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       },
    //     },
    //   }
    // });
  }
  // ngAfterViewInit() {
  //   this.generateReport();
  // }

  // ngOnDestroy() {
  //   if (this.chart) {
  //     this.chart.destroy();
  //   }
  // }

  // ngAfterViewInit() {
  //   // Initial chart rendering
  //   this.generateReport();
  // }

  onInput(e:KeyboardEvent){
    if(e.keyCode===8){
    e.preventDefault();
    }else{
    console.log(e.which);
    }
  }
}
