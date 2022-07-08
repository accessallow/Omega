import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataReload = new Subject<any>();

  private baseURL = "http://localhost:8080";

  private studentServiceUrl = this.baseURL+"/STUDENT-SERVICE";
  private subjectServiceUrl = this.baseURL+"/SUBJECT-SERVICE";
  private examServiceUrl = this.baseURL+"/EXAM-SERVICE";
  private registrationServiceUrl = this.baseURL+"/REGISTRATION-SERVICE";
  private reportServiceUrl = this.baseURL+"/REPORT-SERVICE";
  private requestOptions = {headers: {'Content-Type': 'application/json'}};

  private loginServiceUrl = this.baseURL+"/token";

  constructor(private httpClient: HttpClient) { }

  public getReportData(rollNumber:string) : Observable<any>{
    return this.httpClient.get<any>(this.reportServiceUrl+"/report_cb/find_by_roll_number?roll_number="+rollNumber);
  }

  //Student Operations
  public getStudents() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.studentServiceUrl+"/data");
  }

  public addStudent(studentObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.studentServiceUrl+"/create",JSON.stringify(studentObject),this.requestOptions);
  }

  public deleteStudent(studentObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.studentServiceUrl+"/delete",JSON.stringify(studentObject),this.requestOptions);
  }

  public updateStudent(studentObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.studentServiceUrl+"/update",JSON.stringify(studentObject),this.requestOptions);
  }

  //Subject Operations
  public getSubjects() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.subjectServiceUrl+"/data");
  }

  public addSubject(subjectObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.subjectServiceUrl+"/create",JSON.stringify(subjectObject),this.requestOptions);
  }

  public deleteSubject(subjectObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.subjectServiceUrl+"/delete",JSON.stringify(subjectObject),this.requestOptions);
  }

  public updateSubject(subjectObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.subjectServiceUrl+"/update",JSON.stringify(subjectObject),this.requestOptions);
  }

  //Registration Operations
  public getRegistrations() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.registrationServiceUrl+"/data");
  }

  public addRegistration(regObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.registrationServiceUrl+"/create",JSON.stringify(regObject),this.requestOptions);
  }

  public deleteRegistration(regObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.registrationServiceUrl+"/delete",JSON.stringify(regObject),this.requestOptions);
  }

  public updateRegistration(regObject : any) : Observable<any>{
    return this.httpClient.post<any>(this.registrationServiceUrl+"/update",JSON.stringify(regObject),this.requestOptions);
  }

    //Exam Operations
    public getExams() : Observable<any[]>{
      return this.httpClient.get<any[]>(this.examServiceUrl+"/detailed_data");
    }

    public addExam(regObject : any) : Observable<any>{
      return this.httpClient.post<any>(this.examServiceUrl+"/create",JSON.stringify(regObject),this.requestOptions);
    }

    public deleteExam(regObject : any) : Observable<any>{
      return this.httpClient.post<any>(this.examServiceUrl+"/delete",JSON.stringify(regObject),this.requestOptions);
    }

    public updateExam(regObject : any) : Observable<any>{
      return this.httpClient.post<any>(this.examServiceUrl+"/update",JSON.stringify(regObject),this.requestOptions);
    }


    public login(username:string, password:string) : Observable<any>{
      let formData: FormData = new FormData();
      formData.append("username",username);
      formData.append("password",password);
      return this.httpClient.post(this.loginServiceUrl,formData,{responseType:'text'});
    }

}
