import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseDataService } from "src/app/services/base-data-service";

@Injectable()
export class ProjectService extends BaseDataService{
  public override url = this.baseURL + '/api/project';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

}
