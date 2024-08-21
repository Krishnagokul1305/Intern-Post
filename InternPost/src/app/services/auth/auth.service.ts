import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_USER = 'http://127.0.0.1:3000/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_USER}/login`, data);
  }

  isLogged(): boolean {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.API_USER}/signup`, data);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
