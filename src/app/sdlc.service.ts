import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownList {
  Text!: string;
  Value!: string;
}

export class SendEmail {
  ddlSDFCMethods!: DropdownList[];
}

@Injectable({
  providedIn: 'root'
})
export class SDLCService {
  
  constructor(private http: HttpClient,private constantService: ConstantService) { }

  GetProjectWorkType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.constantService.apiEndpoint}/GetProjectWorkType`);
  }
  getProjectDetailsByProjectDataId(projectDataId: number): Observable<any> {
    const url = `${this.constantService.apiEndpoint}/GetProjectWorkType/${projectDataId}`;
    return this.http.get(url);
  }
  getProjectsByDM(worktypeId: number, dManager: string): Observable<any> {
    const data = {
      worktypeId: worktypeId,
      dManager: dManager,
    };

    return this.http.post(`${this.constantService.apiEndpoint}/GetProjectsbyDM?dManager=${dManager}`, worktypeId);
  }
  getCustomersByProjectId(projectId: number): Observable<any> {
    const url = `${this.constantService.apiEndpoint}/GetCustomersByProjectId/${projectId}`;
    return this.http.get(url);
  }
  getProjectDetails(worktypeId: number): Observable<any> {
    return this.http.get(`${this.constantService.apiEndpoint}/GetProjectDetails/${worktypeId}`);
  }

  getProjectsByEmployeeId(worktypeId: number,employeeId: number): Observable<any> {
    return this.http.post(`${this.constantService.apiEndpoint}/GetProjectsByEmployeeId?EmployeeId=${employeeId}`,worktypeId);
  }

  getClientDetailsByProjectId(projectId: number): Observable<any> {
    return this.http.get(`${this.constantService.apiEndpoint}/GetClientDetailsByProjectId/${projectId}`);
  }
  sendEmail(emailData: any,projectID : number,emailID : number,workTypeID : number): Observable<any> {
    const url = `${this.constantService.apiEndpoint}/send-email`;
    let sendingEmail = {EmailRequest : emailData,WorkTypeId : workTypeID,ProjectID : projectID,EmailID : emailID};
    return this.http.post(url, sendingEmail,{responseType: 'text'});
  }
  sendEmailTracking(emailData: any,workTypeId : number): Observable<any> {
    const url = `${this.constantService.apiEndpoint}/send-emailTracking`;
    let sendEmailRequest = {EmailHistory : emailData,WorkTypeId : workTypeId};
    return this.http.post(url,sendEmailRequest,{responseType: 'text'});
  }
  getSurveyResponses(fromDate: Date, toDate: Date): Observable<any> {
    return this.http.get(`${this.constantService.apiEndpoint}/getSurveyResponses?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`);
  }
  sendForgotEmail(emailAddress : string): Observable<any>{
    const url = `${this.constantService.apiEndpoint}/ForgotEmail?EmailAddress=${emailAddress}`;
    return this.http.post(url,'',{responseType: 'json'});
  }
  conformPAssword(emailAddress : string,passowrd : string): Observable<any>{
    const url = `${this.constantService.apiEndpoint}/ConformPassword`;
    let conformPAsswordRequest = {EmailAddress : emailAddress,Password : passowrd};
    return this.http.post(url,conformPAsswordRequest,{responseType: 'json'});
  }
  resetPassword(username : string,oldpassword : string,newpassowrd : string): Observable<any>{
    const url = `${this.constantService.apiEndpoint}/ConformPassword`;
    let conformPAsswordRequest = {UserName : username,OldPassword : oldpassword,NewPassword : newpassowrd};
    return this.http.post(url,conformPAsswordRequest,{responseType: 'json'});
  }
}
