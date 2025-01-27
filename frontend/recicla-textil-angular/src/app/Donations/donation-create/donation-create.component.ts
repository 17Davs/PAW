import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../rest.service';
import { Entity } from '../../models/entity';
import { Pickup } from '../../models/pickup';
import { Rule } from '../../models/rule'; // Import Rule model

@Component({
  selector: 'app-donation-create',
  templateUrl: './donation-create.component.html',
  styleUrls: ['./donation-create.component.css'],
})
export class DonationCreateComponent implements OnInit {
  weight!: number;
  quantity!: number;
  receivingEntity!: string;
  pickupPoint!: string;
  pointsGained = 0;
  donor!: string;
  entities: Entity[] = [];
  pickups: Pickup[] = [];
  rules: Rule[] = [];

  constructor(private rest: RestService, private router: Router) {}

  ngOnInit(): void {
    this.donor = localStorage.getItem('userId') || '';
    this.rest.getEntities().subscribe((data: Entity[]) => {
      this.entities = data;
    });

    this.rest.getPickups().subscribe((data: Pickup[]) => {
      this.pickups = data;
    });

    this.rest.getRules().subscribe((data: Rule[]) => {
      this.rules = data;
    });
  }

  calculatePoints() {
    const weight = this.weight || 0;
    const quantity = this.quantity || 0;
    this.pointsGained = 0; // Reset points

    // Calculate points based on rules
    for (var rule of this.rules) {
      if (rule.criteria === 'kg') {
        this.pointsGained += weight * rule.points;
      } else if (rule.criteria === 'item') {
        this.pointsGained += quantity * rule.points;
      }
    }
  }

  createDonation(form: any) {
    if (form.valid) {
      console.log('Donor:', this.donor);
      console.log('Weight:', this.weight);
      console.log('Quantity:', this.quantity);
      console.log('Receiving Entity:', this.receivingEntity);
      console.log('Pickup Point:', this.pickupPoint);
      console.log('Points Gained:', this.pointsGained);

      const newDonation: any = {
        donor: this.donor,
        weight: this.weight,
        quantity: this.quantity,
        receivingEntity: this.receivingEntity,
        pickupPoint: this.pickupPoint,
        points: this.pointsGained,
      };
      this.rest.createDonation(newDonation).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
