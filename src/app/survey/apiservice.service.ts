import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
    public SetUserName : string = ''
    private readonly submissionKey = 'formSubmitted';
    constructor(private http: HttpClient,private constantService: ConstantService) { }
    PostSurveydata(surveyData: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(`${this.constantService.apiEndpoint}/api/Survey/SaveCustomerFeedback`, surveyData, httpOptions);
      }
    SaveSurveyData(surveyData:any):Observable<any>
    {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<any>(`${this.constantService.apiEndpoint}/api/Survey/SaveCustomerFeedback`, surveyData, httpOptions);
    }
    getSurvey(workTypeId:number,emailId:number):Observable<any>
    {
      let  params = new HttpParams().set("surveyId",workTypeId);
      return this.http.get<any>(`${this.constantService.apiEndpoint}/api/Survey/GetCustomerDetails?ProjectID=`+workTypeId+`&CustomerEmail=`+emailId);
    }
    getWorkTypeQuestions(ProjectId:number):Observable<any>
    {
      return this.http.get<any>(`${this.constantService.apiEndpoint}/api/Survey/Questionnaires?ProjectId=`+ProjectId)
    }
    getReport(ProjectId:any):Observable<any>
    {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<any>(`${this.constantService.apiEndpoint}/api/Survey/GetCustomerReport?projectIds=`,ProjectId,httpOptions)
    }
    getProjects():Observable<any>
    {
      return this.http.get<any>(`${this.constantService.apiEndpoint}/api/Survey/GetProjectDetails`);
    }
    
    validateUser(usernName:string,password:string):Observable<any>
    {
      this.SetUserName =usernName;
      return this.http.get<any>(`${this.constantService.apiEndpoint}/api/Home/ValidateUser?UsernName=`+usernName+`&Password=`+password);
    }
    
    get GetUserName() : string{
      if(!this.SetUserName){
      const getUserName = localStorage.getItem("CustomerUSerName")?.toString();
      if(getUserName)
      this.SetUserName=getUserName;
       return this.SetUserName;
      }
      else{
       return this.SetUserName;
      }
    }
    getProjectSurveyDetails(fromDate: string, toDate: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const params = {
        fromDate: fromDate,
        toDate: toDate
      };
  
      return this.http.get<any>(`${this.constantService.apiEndpoint}/api/Survey/GetProjectServeyDetails`, { headers, params });
    }
      // checkFormSubmission(): boolean {
      //   return localStorage.getItem(this.submissionKey) === 'true';
      // }
      // setFormSubmitted(): void {
      //   localStorage.setItem(this.submissionKey, 'true');
      // }
}
