import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
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

  constructor() {}

  getOffers() {
    return this.offerLetters;
  }
}
