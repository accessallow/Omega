import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base-data-service";

@Injectable()
export class ProjectPlannerService extends BaseDataService{
  public override url = this.baseURL + '/api/project';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  planProject(projectPlan:any){
    return this.httpClient.post<any>(this.url+"/plan",JSON.stringify(projectPlan),this.requestOptions);
  }

  getProjectStructure(projectId:any){
    return this.httpClient.get<any>(this.url+"/get_structure/"+projectId,this.requestOptions);
  }

  updateProjectPlan(projectId:any,projectPlan:any){
    return this.httpClient.post<any>(this.url+"/plan/"+projectId,JSON.stringify(projectPlan),this.requestOptions);
  }

}
