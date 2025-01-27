import { Component, Input } from '@angular/core';
import { Pickup } from '../../models/pickup';

@Component({
  selector: 'app-pickup-details',
  templateUrl: './pickup-details.component.html',
  styleUrl: './pickup-details.component.css',
})
export class PickupDetailsComponent {
  @Input() pickup: Pickup | null = null;
}
