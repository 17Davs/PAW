import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from '../../models/donation';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.component.html',
  styleUrls: ['./donations-list.component.css'],
})
export class DonationsListComponent implements OnInit {
  donations: Donation[] = [];
  filteredDonations: Donation[] = [];
  userType: string = 'donor';
  userId: string = '';
  selectedDonation?: Donation;
  statuses: string[] = [
    'All',
    'waiting_pickup',
    'at_pickup',
    'verified',
    'send_to_entity',
    'send_to_entity',
    'cancelled',
  ];
  selectedStatus: string = 'All';

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUserType = localStorage.getItem('userType');
    this.userType = currentUserType !== null ? currentUserType : '';
    const currentUserId = localStorage.getItem('userId');
    this.userId = currentUserId !== null ? currentUserId : '';
    this.getDonations();
  }

  getDonations() {
    if (this.userType === 'donor') {
      this.rest.getDonationsFrom(this.userId).subscribe((data: Donation[]) => {
        console.log('Donations from donor:', data);
        this.donations = data;
        this.filterDonations();
      });
    } else if (this.userType === 'entity') {
      this.rest.getDonationsTo(this.userId).subscribe((data: Donation[]) => {
        console.log('Donations to entity:', data);
        this.donations = data;
        this.filterDonations();
      });
    }
  }

  filterDonations() {
    if (this.selectedStatus === 'All') {
      this.filteredDonations = this.donations;
    } else {
      this.filteredDonations = this.donations.filter(
        (donation) => donation.status.name === this.selectedStatus
      );
    }
  }

  selectDonation(index: number) {
    this.selectedDonation = this.filteredDonations[index];
  }

  deselectDonation() {
    this.selectedDonation = undefined;
  }

  navigateToNewDonation() {
    this.router.navigate(['/donations/new']);
  }
}
