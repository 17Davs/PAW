import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrl: './entity-details.component.css',
})
export class EntityDetailsComponent implements OnInit {
  @Input() entity: any;
  constructor() {}

  ngOnInit(): void {}
}
