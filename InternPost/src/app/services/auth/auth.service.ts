import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_AUTH = 'http://127.0.0.1:3000/auth';
  private API_USER = 'http://127.0.0.1:3000/users';

  user!: any;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_AUTH}/login`, data);
  }

  isLogged(): boolean {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}').user;
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token') || '').token;
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.API_AUTH}/signup`, data);
  }

  createUsers(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.post(`${this.API_USER}`, data, { headers });
  }

  updateUserDetails(data: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    console.log(this.getToken())

    const userId = this.getUserData()._id;

    return this.http.patch(`${this.API_USER}/${userId}`, data, { headers });
  }

  updateUserPassword(data: any): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });

    return this.http.patch(`${this.API_USER}/updatePassword`, data, {
      headers,
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}
