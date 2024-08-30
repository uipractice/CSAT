import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx'
import { ApiserviceService } from '../survey/apiservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customerfeedbackreport',
  templateUrl: './customerfeedbackreport.component.html',
  styleUrls: ['./customerfeedbackreport.component.scss']
})
export class CustomerfeedbackreportComponent implements OnInit  {
   form!: FormGroup;
   
   @ViewChild('paginatorFirst')paginatorFirst!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   dummyArray:any=[];
  currentPage: any;
  displayedColumns: string[] = ['projectName', 'clientManagerName', 'questionText', 'rating', 'name', 'remarks', 'statusID']; // Replace string[] with the actual type of displayedColumns

  dataSource!: MatTableDataSource<any>;
  constructor(private ApiserviceService: ApiserviceService,private formBuilder:FormBuilder,private cdr: ChangeDetectorRef){
    //this.dataSource = new MatTableDataSource(this.reportList);
  }
  projectList:any=[];
  reportList:any=[]=[];

  PId:any;
  fileName ="ExcelSheet.xlsx";
  dropValue:any;
  checkReportData:boolean=false;
  isReportAvailable:boolean=false;
  ProjectIds:any=[];
  dropdownList:any =[];
  selectedItems =[];
  dropdownSettings ={};
  exportReportFlag:boolean=true;
  pageEvent!: PageEvent;
  totalItems: number = 0;
  pageSize: number = 10;
   ngOnInit():void
   {
    this.initForm();
    this.dropdownList=[
      {item_id:1, item_text:'Mumbai'},
      {item_id:2, item_text:'Bangaliru'},
      {item_id:3, item_text:'Pune'},
      {item_id:4, item_text:'Navsari'},
      {item_id:5, item_text:'New Delhi'}
    ];
    this.getProjects();
    this.dropdownSettings={
      singleSelection:false,
      idField:'id',
      textField:'projectName',
      selectAllText:'Select All',
      unSelectAllText:'unSelect All',
      itemsShowLimit:0,
      allowSearchFilter:true
    };
    this.ProjectIds=[];

   }
   initForm(){
    this.form=this.formBuilder.group({
      Projects:['',[Validators.required]]
    })
   }
   onItemSelect(item:any)
   {
    this.ProjectIds.push(item.id);
   }
   onDeSelect(item:any)
   {
    const index: number = this.ProjectIds.indexOf(item.id);
    if (index !== -1) {
      this.ProjectIds.splice(index, 1);
  }
   }
   onSelectAll(item:any)
   {
    for(let i=0;i<=item.length-1;i++)
    {
    this.ProjectIds.push(item[i].id);
    // console.log(this.ProjectIds);
    }
    // console.log(item);
   }
   onDeSelectAll(item:any)
   {
     this.ProjectIds=[];
   }
   getProjects(){
     this.ApiserviceService.getProjects().subscribe({
       next:(data:any)=>{
         this.projectList=data;
        //  this.dataSource.paginator=this.paginatorFirst;
        //  this.dataSource.sort=this.sort;
       },
       error:(error:any)=>{console.log(error)}
     })
   }


   searchReport(){

     this.checkReportData=true;
     if(this.ProjectIds.length > 0){
       this.ApiserviceService.getReport(this.ProjectIds).subscribe({
         next: (resultData: any) => {
          
            this.dummyArray = [];
          if(resultData.length>0){
            this.exportReportFlag=true;
            this.isReportAvailable=false;
            this.reportList =resultData;
            this.cdr.detectChanges();
            for (let index = 0; index < 10; index++) {
             const element = resultData[index];
             this.dummyArray.push(element);
           }
           this.dataSource=new MatTableDataSource(this.reportList);
            this.dataSource.paginator=this.paginatorFirst;
          }
          else{
            this.exportReportFlag=true;
            this.isReportAvailable=true;
          }

         },
         error: (error: any) => { console.log(error) }
       })
      
      }
      else
      this.reportList =[];
     }
     pageChanged(event: any): void {
      this.currentPage = event.pageIndex + 1;

        const isLastPage = this.currentPage === Math.ceil(this.totalItems / this.pageSize);
        if (isLastPage) {
          const nextButton = document.querySelector('.mat-paginator-navigation-next');
          if (nextButton) {
            nextButton.classList.add('mat-paginator-navigation-disabled');
            nextButton.setAttribute('disabled', 'true');
          }
        } else {
          const nextButton = document.querySelector('.mat-paginator-navigation-next');
          if (nextButton) {
            nextButton.classList.remove('mat-paginator-navigation-disabled');
            nextButton.removeAttribute('disabled');
          }
        }
     }
   onProjectChange(event: any)
   {
     const selectedProject = event.target.value;
   }
  //  exportExcel()
  //  {
  //    let data = document.getElementById("table-data");
  //     if(data ==null)
  //     {
  //       this.exportReportFlag=false;
  //       this.isReportAvailable=false;
  //     }
  //    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

  //    const wb:XLSX.WorkBook = XLSX.utils.book_new();
  //    XLSX.utils.book_append_sheet(wb,ws,'Sheet1')

  //    XLSX.writeFile(wb,this.fileName)
  //  }

   exportExcel() {
    // Ensure data is available and the MatTable is initialized
    if (this.reportList && this.reportList.length > 0 && this.sort && this.paginatorFirst) {
      // Extract the data from MatTable
      const data = this.reportList.map((item:any) => ({
        Project: item.projectName,
        Client: item.clientManagerName,
        Question: item.questionText,
        Rating: item.rating,
        Worktype: item.name,
        Remarks: item.remarks,
        Status: item.statusID
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      XLSX.writeFile(wb, this.fileName);
    } else {
      this.exportReportFlag = false;
      this.isReportAvailable = false;
    }
  }
}





