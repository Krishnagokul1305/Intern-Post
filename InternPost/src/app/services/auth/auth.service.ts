import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  login(data: any) {
    console.log(data);
  }
  signup(data: any) {
    console.log(data);
  }
}
