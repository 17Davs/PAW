import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userType!: string;

  constructor() {}

  ngOnInit() {
    const currentUserType = localStorage.getItem('userType');
    this.userType = currentUserType !== null ? currentUserType : '';
  }
}
