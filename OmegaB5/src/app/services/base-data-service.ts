import { HttpClient } from "@angular/common/http";

export class BaseDataService {
  protected baseURL = "http://localhost:8080";
  protected url = "";
  protected requestOptions = {headers: {'Content-Type': 'application/json'}};

  constructor(public httpClient: HttpClient) {

  }

  create(obj:any){
    return this.httpClient.post<any>(this.url+"/create",obj,this.requestOptions);
  }

  getAll(){
    return this.httpClient.get<any>(this.url+"/all");
  }

  update(obj:any){
    return this.httpClient.post<any>(this.url+"/update",JSON.stringify(obj),this.requestOptions);
  }

  delete(id:any){
    return this.httpClient.post<any>(this.url+"/delete",id,this.requestOptions);
  }
}
