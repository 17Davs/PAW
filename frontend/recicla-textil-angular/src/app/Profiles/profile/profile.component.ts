import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { Donor } from '../../models/donor';
import { Entity } from '../../models/entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userType!: string;

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType') || '';
  }
}
