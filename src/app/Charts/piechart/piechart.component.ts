import { Component, ViewChild,  Input, OnInit } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent  implements OnInit {
  @ViewChild("chart",{ static: false })  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>|any;  
  @Input() seriesValue: number[]=[]; 
  @Input() labels!: string[]; 
  
  constructor() {   
   this.configureChartOptions([],[]);
   //this.refreshChart(this.seriesValue,this.labels);
  }

  refreshChart(values:number[], labels:string[]){    
    this.configureChartOptions(values,labels);
  }
  ngOnInit(): void {
    this.refreshChart(this.seriesValue,this.labels);
  }
  configureChartOptions(values:number[], labels:string[]){
    this.chartOptions = {      
      series: values,    
      chart: {
        width: 480,
        height: 350,
        type: "pie",
        foreColor: '#fff',
      }, 
      dataLabels: {
        enabled: true,
        textAnchor: 'end',
      },   
      labels: labels,    
      responsive: [
        {
          breakpoint:420,
          options: {
            chart: {
              width: 400
            },plotOptions: {
              pie: {
                customScale: 0.8
              }
            },
            legend: {
              position: "bottom",
              horizontalAlign: 'left', 
              height:100,
              width: 300,
            }
          }
        }
      ]
    };   
  }   
}
