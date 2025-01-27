import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from '../../models/entity';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrl: './entities-list.component.css',
})
export class EntitiesListComponent implements OnInit {
  entities: Entity[] = [];
  selectedEntity?: Entity;

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities() {
    this.rest.getEntities().subscribe((data: Entity[]) => {
      console.log(data);
      this.entities = data;
    });
  }

  selectEntity(index: number) {
    this.selectedEntity = this.entities[index];
  }
  deselectEntity() {
    this.selectedEntity = undefined;
  }

  navigateToNewDonation() {
    this.router.navigate(['/donations/new']);
  }
}
