import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base-data-service";

@Injectable()
export class ProjectService extends BaseDataService{
  private projectUrl = this.baseURL + '/api/project';
  private requestOptions = {headers: {'Content-Type': 'application/json'}};


  constructor(private httpClient: HttpClient) {
    super();
  }

  createProject(projectObj:any){
    return this.httpClient.post<any>(this.projectUrl+"/create",projectObj,this.requestOptions);
  }

  getAllProjects(){
    return this.httpClient.get<any>(this.projectUrl+"/all");
  }

  updateProject(projectObj:any){
    return this.httpClient.post<any>(this.projectUrl+"/update",JSON.stringify(projectObj),this.requestOptions);
  }

  deleteProject(projectObj:any){
    return this.httpClient.post<any>(this.projectUrl+"/delete",projectObj.id,this.requestOptions);
  }

}
