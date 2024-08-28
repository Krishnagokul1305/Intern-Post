import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overview-box',
  standalone: true,
  imports: [],
  templateUrl: './overview-box.component.html',
  styleUrls: ['./overview-box.component.css'],
})
export class OverviewBoxComponent implements OnChanges {
  @Input() stats: any = {};

  approved: number = 0;
  overAllUploads: number = 0;
  rejected: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stats']) {
      this.updateStats();
    }
  }

  private updateStats() {
    this.overAllUploads = this.stats?.overallTotal || 0;

    const statusStats = this.stats?.statusStats || [];
    this.approved = statusStats.find(
      (stat: { status: string }) => stat.status === 'approved'
    )?.total || 0;

    this.rejected = statusStats.find(
      (stat: { status: string }) => stat.status === 'rejected'
    )?.total || 0;
  }
}
