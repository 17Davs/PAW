import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Donation } from '../../models/donation';
import { Donor } from '../../models/donor';
import { Entity } from '../../models/entity';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-donor-home',
  templateUrl: './donor-home.component.html',
  styleUrls: ['./donor-home.component.css'],
})
export class DonorHomeComponent implements OnInit {
  userId!: string;
  donations: Donation[] = [];
  myTotalDonations = 0;
  myPoints = 0;
  numEntities!: number;
  recentDonations: Donation[] = [];

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
    this.getPoints();
    this.getNumEntities();
  }

  getDonations() {
    this.donations = [];
    this.rest.getDonationsFrom(this.userId).subscribe((data: Donation[]) => {
      console.log(data);
      this.donations = data;
      this.myTotalDonations = this.donations.length;
      this.recentDonations = this.donations.slice(0, 3);
      this.initializeCharts();
    });
  }

  getPoints() {
    this.rest.getDonor(this.userId).subscribe((data: Donor) => {
      console.log(data);
      this.myPoints = data.points;
    });
  }

  getNumEntities() {
    this.rest.getEntities().subscribe((data: Entity[]) => {
      console.log(data);
      this.numEntities = data.length;
    });
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
    const averageWeight = totalWeight / this.donations.length;
    const averageQuantity = totalQuantity / this.donations.length;

    this.combinedChart = new Chart({
      chart: {
        type: 'column', // Alterado de 'bar' para 'column'
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
