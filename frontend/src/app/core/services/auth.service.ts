import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      { username, password },
      {
        withCredentials: true 
      }
    );
  }



  register(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`,
      { username, password },
      {
        withCredentials: true 
      }
    );
  }

}
