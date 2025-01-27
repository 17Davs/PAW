import { Component } from '@angular/core';
import { Entity } from '../../models/entity';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrl: './entity-profile.component.css',
})
export class EntityProfileComponent {
  entity!: Entity;
  showConvertPoints: boolean = false;
  userId!: string;

  constructor(private rest: RestService) {}

  toggleConvertPoints() {
    this.showConvertPoints = !this.showConvertPoints;
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    this.rest.getEntity(this.userId).subscribe((data: Entity) => {
      this.entity = data;
    });
  }
}
