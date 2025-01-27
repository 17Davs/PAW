import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Donation } from '../../models/donation';
import { Donor } from '../../models/donor';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-entity-home',
  templateUrl: './entity-home.component.html',
  styleUrls: ['./entity-home.component.css'], // Correção: 'styleUrls' no lugar de 'styleUrl'
})
export class EntityHomeComponent implements OnInit {
  userId!: string;
  donations: Donation[] = [];
  myTotalDonations = 0;
  recentDonations: Donation[] = [];
  topDonors: { donor: Donor; totalDonations: number }[] = [];

  combinedChart?: Chart;

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUserId = localStorage.getItem('userId');
    this.userId = currentUserId !== null ? currentUserId : '';
    this.getDonations();
  }

  getDonations() {
    this.donations = [];
    this.rest.getDonationsTo(this.userId).subscribe((data: Donation[]) => {
      console.log(data);
      this.donations = data;
      this.myTotalDonations = data.length;
      this.recentDonations = data.slice(0, 5);
      this.calculateTopDonors();
      this.initializeCharts();
    });
  }

  calculateTopDonors() {
    const donorMap = new Map<
      string,
      { donor: Donor; totalDonations: number }
    >();

    this.donations.forEach((donation) => {
      const donorId = donation.donor.email;
      if (!donorMap.has(donorId)) {
        donorMap.set(donorId, { donor: donation.donor, totalDonations: 0 });
      }
      const donorData = donorMap.get(donorId);
      if (donorData) {
        donorData.totalDonations += 1;
      }
    });

    const sortedDonors = Array.from(donorMap.values())
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .slice(0, 5);

    this.topDonors = sortedDonors;
    console.log(this.topDonors);
  }

  initializeCharts() {
    const totalWeight = this.donations.reduce(
      (sum, donation) => sum + donation.weight,
      0
    );
    const totalQuantity = this.donations.reduce(
      (sum, donation) => sum + donation.quantity,
      0
    );
    const averageWeight = this.donations.length
      ? totalWeight / this.donations.length
      : 0;
    const averageQuantity = this.donations.length
      ? totalQuantity / this.donations.length
      : 0;

    this.combinedChart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Average Data',
      },
      xAxis: {
        categories: ['Average Data'],
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          name: 'Average Weight',
          data: [averageWeight],
          type: 'column',
          color: '#28a745',
        },
        {
          name: 'Average Items',
          data: [averageQuantity],
          type: 'column',
          color: '#6c757d',
        },
      ],
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
