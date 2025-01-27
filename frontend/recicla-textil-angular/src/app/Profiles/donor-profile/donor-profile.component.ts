import { Component } from '@angular/core';
import { Donor } from '../../models/donor';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-donor-profile',
  templateUrl: './donor-profile.component.html',
  styleUrl: './donor-profile.component.css',
})
export class DonorProfileComponent {
  donor!: Donor;
  showConvertPoints: boolean = false;

  constructor(private rest: RestService) {}

  toggleConvertPoints() {
    this.showConvertPoints = !this.showConvertPoints;
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') || '';

    this.rest.getDonor(userId).subscribe((data: Donor) => {
      this.donor = data;
    });
  }

  onDonorUpdated(updatedDonor: Donor) {
    this.donor = updatedDonor;
  }
}
