 import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// // import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
 export class ReportComponent {
//   @ViewChild('pieChart')
//   pieChart!: ElementRef;
//   chart: any;

//   generateReport() {
//     // Replace these values with your actual data
//     const submitted = 50;
//     const receivedEmail = 30;
//     const gotMailNotSubmitted = 20;

//     const data = [submitted, receivedEmail, gotMailNotSubmitted];
//     const labels = ['Submitted', 'Received Email', 'Got Mail but Not Submitted'];

//     this.updateChart(data, labels);
//   }

//   updateChart(data: number[], labels: string[]) {
//     if (this.chart) {
//       this.chart.destroy();
//     }

//     const ctx = this.pieChart.nativeElement.getContext('2d');

//     // this.chart = new Chart(ctx, {
//     //   type: 'pie',
//     //   data: {
//     //     labels: labels,
//     //     datasets: [{
//     //       data: data,
//     //       backgroundColor: [
//     //         'rgba(75, 192, 192, 0.7)',
//     //         'rgba(255, 99, 132, 0.7)',
//     //         'rgba(255, 205, 86, 0.7)'
//     //       ],
//     //       borderColor: [
//     //         'rgba(75, 192, 192, 1)',
//     //         'rgba(255, 99, 132, 1)',
//     //         'rgba(255, 205, 86, 1)'
//     //       ],
//     //       borderWidth: 1
//     //     }]
//     //   },
//     //   options: {
//     //     responsive: true,
//     //     maintainAspectRatio: false,
//     //     plugins: {
//     //       legend: {
//     //         position: 'top',
//     //       },
//     //     },
//     //   }
//     // });
//   }

//   ngAfterViewInit() {
//     // Initial chart rendering
//     this.generateReport();
//   }
 }
