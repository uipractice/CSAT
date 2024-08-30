import { Component } from '@angular/core';

export interface TableElement {
  slNo: number;
  customerName: string;
  projectName: string;
  projectManager: string;
  dateShared: string;
  dateReceived: string;
  status: string;
  isClicked: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['slNo', 'customerName', 'projectName', 'projectManager', 'dateShared', 'dateReceived', 'status', 'action'];
  dataSource: TableElement[] = [
    { slNo: 1, customerName: 'John Doe', projectName: 'Project X', projectManager: 'Alice Smith', dateShared: '2022-03-15', dateReceived: '2022-03-20', status: 'Completed',isClicked: false },
    { slNo: 2, customerName: 'Jane Smith', projectName: 'Project Y', projectManager: 'Bob Johnson', dateShared: '2022-03-18', dateReceived: '2022-03-25', status: 'Pending',isClicked: false },
    { slNo: 2, customerName: 'Steve Rogers', projectName: 'Project Z', projectManager: 'Will Smith', dateShared: '2022-03-20', dateReceived: '2022-03-27', status: 'In Progress',isClicked: false },
    // Add more data as needed
  ];

  onEyeIconClick(element: TableElement) {
    // Handle eye icon click action
    console.log('Eye icon clicked for:', element);
    element.isClicked = !element.isClicked;
  }
}
