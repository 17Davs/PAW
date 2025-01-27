import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pickup } from '../../models/pickup';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-pickup-list',
  templateUrl: './pickup-list.component.html',
  styleUrl: './pickup-list.component.css',
})
export class PickupListComponent implements OnInit {
  pickups: Pickup[] = [];
  filteredPickups: Pickup[] = [];
  selectedPickup: Pickup | null = null;
  selectedCity: string = '';
  cities: string[] = [];

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getPickups();
  }

  getPickups() {
    this.rest.getPickups().subscribe((data: Pickup[]) => {
      console.log(data);
      this.pickups = data;
      this.filteredPickups = data; //all
      this.cities = [...new Set(data.map((pickup) => pickup.address.city))]; // possibel cities
    });
  }

  selectPickup(index: number) {
    this.selectedPickup = this.filteredPickups[index];
  }

  deselectPickup(): void {
    this.selectedPickup = null;
  }

  filterPickups(): void {
    if (this.selectedCity) {
      this.filteredPickups = this.pickups.filter(
        (pickup) => pickup.address.city === this.selectedCity
      );
    } else {
      this.filteredPickups = this.pickups;
    }
  }

  navigateToNewDonation() {
    this.router.navigate(['/donations/new']);
  }
}
