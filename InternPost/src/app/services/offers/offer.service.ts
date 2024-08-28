import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getOffers(page: number, pageSize: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = {
      page: page.toString(),
      limit: pageSize.toString()
    };

    return this.http.get<any>(this.API_OFFERS, { headers, params });
  }

  getOfferStats(): Observable<any> {
    return this.http.get(`${this.API_OFFERS}/overAll-stats`);
  }

  getTodayActivities(): Observable<any> {
    return this.http.get(`${this.API_OFFERS}/todayActivities`);
  }

  getPastActivitiesStats(): Observable<any> {
    return this.http.get(`${this.API_OFFERS}/fivedaysActivities`);
  }

  postOffer(data: any): Observable<any> {
    return this.http.post(this.API_OFFERS, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserOffers(userId: string): Observable<any> {
    return this.http.get(`${this.API}/users/${userId}/offers`, {
      headers: this.getAuthHeaders(),
    });
  }

  getOfferById(offerId: string): Observable<any> {
    return this.http.get(`${this.API_OFFERS}/${offerId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  approveOffer(offerId: string): Observable<any> {
    return this.http.patch(`${this.API_OFFERS}/approve/${offerId}`, {}, {
      headers: this.getAuthHeaders(),
    });
  }

  rejectOffer(offerId: string, data: any): Observable<any> {
    return this.http.patch(`${this.API_OFFERS}/reject/${offerId}`, data, {
      headers: this.getAuthHeaders(),
    });
  }
}
