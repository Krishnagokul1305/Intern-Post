import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private API = "http://127.0.0.1:3000";
  private API_OFFERS = `${this.API}/offers`;

  offerLetters = [
    // {
    //   userName: 'John Doe',
    //   rollNo: 'CS101',
    //   approvalStatus: 'Approved',
    //   batch: '2024',
    //   department: 'CSE', // Computer Science Engineering
    //   multipleOffers: true,
    // },
    // {
    //   userName: 'Jane Smith',
    //   rollNo: 'EC202',
    //   approvalStatus: 'Pending',
    //   batch: '2024',
    //   department: 'ECE', // Electronics and Communication Engineering
    //   multipleOffers: true,
    // },
    // {
    //   userName: 'Michael Johnson',
    //   rollNo: 'ME303',
    //   approvalStatus: 'Rejected',
    //   batch: '2023',
    //   department: 'ME', // Mechanical Engineering
    //   multipleOffers: false,
    // },
    {
      userName: 'Emily Davis',
      rollNo: 'CE404',
      approvalStatus: 'Approved',
      batch: '2023',
      department: 'CE', // Civil Engineering
      multipleOffers: true,
    },
    {
      userName: 'William Brown',
      rollNo: 'BT505',
      approvalStatus: 'Pending',
      batch: '2024',
      department: 'BT', // Biotechnology
      multipleOffers: false,
    },
    {
      userName: 'Sophia Wilson',
      rollNo: 'EE606',
      approvalStatus: 'Approved',
      batch: '2024',
      department: 'EE', // Electrical Engineering
      multipleOffers: true,
    },
    {
      userName: 'James Miller',
      rollNo: 'IT707',
      approvalStatus: 'Rejected',
      batch: '2023',
      department: 'IT', // Information Technology
      multipleOffers: false,
    },
    {
      userName: 'Olivia Taylor',
      rollNo: 'CH808',
      approvalStatus: 'Approved',
      batch: '2024',
      department: 'CHE', // Chemical Engineering
      multipleOffers: true,
    },
    {
      userName: 'Liam Anderson',
      rollNo: 'AE909',
      approvalStatus: 'Pending',
      batch: '2023',
      department: 'AE', // Aerospace Engineering
      multipleOffers: false,
    },
    {
      userName: 'Ava Martinez',
      rollNo: 'MT101',
      approvalStatus: 'Approved',
      batch: '2024',
      department: 'MT', // Metallurgical Engineering
      multipleOffers: true,
    },
  ];
  
  constructor(private http: HttpClient, private auth: AuthService) {}

  getOffers() {
    return this.offerLetters; // Assuming offerLetters is a mock data array
  }

  postOffer(data: any): Observable<any> {
    return this.http.post(this.API_OFFERS, data);
  }

  getUserOffers(userId: string): Observable<any> {
    return this.http.get(`${this.API}/users/${userId}/offers`);
  }
}
