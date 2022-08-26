import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseDataService {
  private loginServiceUrl = this.baseURL + '/token';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public login(username: string, password: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post(this.loginServiceUrl, formData, {
      responseType: 'text',
    });
  }

}
