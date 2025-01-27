import { Component, OnInit, Input } from '@angular/core';
import { Donation } from '../../models/donation';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrl: './donation-details.component.css',
})
export class DonationDetailsComponent implements OnInit {
  @Input() donation?: any;

  constructor() {}

  ngOnInit(): void {}
}
